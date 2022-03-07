const express = require('express')
const { StatusCodes } = require('http-status-codes')
const morgan = require('morgan')

const { lg, responseBuilder } = require('./constants')
const ProductModel = require('./models/product')

// the express app
const app = express()

// middlewares
app.use(express.json())
app.use(morgan('dev'))

// routes
const urlPrefix = process.env.EXPRESS_API_URL_PREFIX || '/api'

// root route
app.get(`${urlPrefix}/`, (req, res) => {
    // lg(`api url: ${process.env.EXPRESS_API_URL_PREFIX}`)
    res.send('node e-commerce api backend')
})

// get all products
app.get(`${urlPrefix}/products`, async (req, res) => {
    try {
        const allProducts = await ProductModel.find()

        responseBuilder(res, StatusCodes.OK, allProducts)
    } catch (err) {
        responseBuilder(res, StatusCodes.INTERNAL_SERVER_ERROR, [], true, err)
    }
})

// post a new product
app.post(`${urlPrefix}/products`, async (req, res) => {
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

module.exports = app
