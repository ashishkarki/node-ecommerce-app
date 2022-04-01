const express = require('express')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')

const { responseBuilder } = require('../constants')
const { CategoryModel } = require('../models/category')
const ProductModel = require('../models/product')

// the router
const productRouter = express.Router()

// routes
// get all products
productRouter.get(`/`, async (req, res) => {
    // use query parameter to  filter products like so
    // /api/products?category=5f4b8d8f8b8f8b8f8b8f8f8f

    try {
        let filterCategories = {}
        if (req.query.categories) {
            filterCategories = {
                category: req.query.categories.split(','),
            }
        }
        console.log(`object: ${JSON.stringify(filterCategories)}`)
        const allProducts = await ProductModel.find(
            // {
            //     category: [req.query.category1, category2],
            // }
            filterCategories
        )
            .select(
                'id name description category price image countInStock brand rating numReviews isFeatured'
            )
            .populate('category')

        responseBuilder(res, StatusCodes.OK, allProducts)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// get a product by id
productRouter.get(`/:id`, async (req, res) => {
    // before first check if this id is valid
    if (!mongoose.isValidObjectId(req.params.id)) {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, {
            message: `Invalid Product id: ${req.params.id}`,
        })
    }

    try {
        const { id } = req.params

        const product = await ProductModel.findById(id).populate('category')

        if (!product) {
            responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Product not found for id: ${id}`,
            })
        } else {
            responseBuilder(res, StatusCodes.OK, product)
        }
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// post a new product
productRouter.post(`/`, async (req, res) => {
    // first check if the category exists
    try {
        await validateCategoryHelper(req.body.category)
    } catch (error) {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, error)
    }

    const newProduct = new ProductModel({
        ...req.body,
    })

    try {
        const savedProd = await newProduct.save()
        responseBuilder(res, StatusCodes.CREATED, savedProd)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// update a product
productRouter.put(`/:id`, async (req, res) => {
    // before first check if this id is valid
    if (!mongoose.isValidObjectId(req.params.id)) {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, {
            message: `Invalid id: ${req.params.id}`,
        })
    }

    // first check if the category exists
    try {
        await validateCategoryHelper(req.body.category)
    } catch (error) {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, error)
    }

    try {
        const { id } = req.params

        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                ...req.body,
            },
            { new: true }
        )

        if (!updatedProduct) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Product not found for id: ${id}`,
            })
        }

        responseBuilder(res, StatusCodes.OK, updatedProduct)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

productRouter.delete(`/:id`, async (req, res) => {
    // before first check if this id is valid
    if (!mongoose.isValidObjectId(req.params.id)) {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, {
            message: `Invalid id: ${req.params.id}`,
        })
    }

    try {
        const deletedProduct = await ProductModel.findByIdAndRemove(
            req.params.id
        )

        if (!deletedProduct) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Product not found for id: ${req.params.id}`,
            })
        } else {
            responseBuilder(res, StatusCodes.OK, deletedProduct)
        }
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// get count stats
productRouter.get(`/stats/get/count`, async (req, res) => {
    try {
        const count = await ProductModel.countDocuments()

        responseBuilder(res, StatusCodes.OK, count)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// get featured products
productRouter.get(`/get/featured/:limit?`, async (req, res) => {
    try {
        const featuredProducts = await ProductModel.find({
            isFeatured: true,
        })
            .select(
                'id name description category price image countInStock brand rating numReviews isFeatured'
            )
            .limit(+req.params.limit || 3)

        responseBuilder(res, StatusCodes.OK, featuredProducts)
    } catch (error) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, {
            message: `Error getting featured products`,
        })
    }
})

const validateCategoryHelper = async (categoryId) => {
    try {
        const categoryForThisProduct = await CategoryModel.findById(categoryId)

        if (!categoryForThisProduct) {
            return Promise.reject({
                message: `Invalid category: ${categoryId}`,
            })
        } else {
            return Promise.resolve()
        }
    } catch (err) {
        return Promise.reject({
            message: `Invalid category: ${categoryId}`,
        })
    }
}

module.exports = productRouter
