const express = require('express')
const { responseBuilder } = require('../constants')

const { Category } = require('../models/category')

// category router
const categoryRouter = express.Router()

// routes
// get all categories
categoryRouter.get('/', async (req, res) => {
    const categoriesList = await Category.find()

    if (!categoriesList) {
        return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
            message: 'No categories found',
        })
    } else {
        return responseBuilder(res, StatusCodes.OK, categoriesList)
    }
})

// exporting
module.exports = categoryRouter
