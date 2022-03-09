const express = require('express')
const { StatusCodes } = require('http-status-codes')

const { responseBuilder } = require('../constants')
const { CategoryModel: Category } = require('../models/category')

const ProductModel = require('../models/product')

// the router
const productRouter = express.Router()

// routes
// get all products
productRouter.get(`/`, async (req, res) => {
    try {
        const allProducts = await ProductModel.find().select(
            'name category price image countInStock -_id'
        )

        responseBuilder(res, StatusCodes.OK, allProducts)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// get a product by id
productRouter.get(`/:id`, async (req, res) => {
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
        const categoryForThisProduct = await Category.findById(
            req.body.category
        )

        if (!categoryForThisProduct) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Invalid category: ${req.body.category}`,
            })
        }
    } catch (err) {
        responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, err)
    }

    const {
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
        dateCreated,
    } = req.body

    const newProduct = new ProductModel({
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured,
        dateCreated,
    })

    try {
        const savedProd = await newProduct.save()

        responseBuilder(res, StatusCodes.CREATED, savedProd)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

module.exports = productRouter
