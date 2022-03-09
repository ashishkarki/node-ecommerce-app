const express = require('express')
const { StatusCodes } = require('http-status-codes')

const { COMPONENT_PATHS, responseBuilder } = require('../constants')

const ProductModel = require('../models/product')

// the router
const productRouter = express.Router()

// routes
// root route
productRouter.get(`/`, (req, res) => {
    // lg(`api url: ${process.env.EXPRESS_API_URL_PREFIX}`)
    res.send('node e-commerce api backend')
})

// get all products
productRouter.get(`${COMPONENT_PATHS.PRODUCTS}`, async (req, res) => {
    try {
        const allProducts = await ProductModel.find()

        responseBuilder(res, StatusCodes.OK, allProducts)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// get a product by id
productRouter.get(`${COMPONENT_PATHS.PRODUCT}`, async (req, res) => {
    try {
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// post a new product
productRouter.post(`${COMPONENT_PATHS.PRODUCTS}`, async (req, res) => {
    const { name, image, countInStock } = req.body

    const newProduct = new ProductModel({
        name,
        image,
        countInStock,
    })

    try {
        const savedProd = await newProduct.save()

        responseBuilder(res, StatusCodes.CREATED, savedProd)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

module.exports = productRouter
