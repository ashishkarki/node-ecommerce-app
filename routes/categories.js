const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { responseBuilder } = require('../constants')

const { CategoryModel: Category } = require('../models/category')

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

// GET category by id
categoryRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const category = await Category.findById(id)

        if (!category) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: 'Category not found for id: ' + id,
            })
        } else {
            return responseBuilder(res, StatusCodes.OK, category)
        }
    } catch (err) {
        return responseBuilder(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            [],
            true,
            err
        )
    }
})

// category POST
categoryRouter.post('/', async (req, res) => {
    const { name, icon, color } = req.body

    const newCategory = new Category({
        name,
        icon,
        color,
    })

    try {
        const savedCategory = await newCategory.save()

        return responseBuilder(res, StatusCodes.CREATED, savedCategory)
    } catch (err) {
        return responseBuilder(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            [],
            true,
            err
        )
    }
})

// category UPDATE
categoryRouter.put('/:id', async (req, res) => {
    const { id } = req.params

    const { name, icon, color } = req.body

    try {
        const category = await Category.findById(id)

        if (!category) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: 'Category not found for id: ' + id,
            })
        }

        category.name = name
        category.icon = icon
        category.color = color

        const updatedCategory = await category.save()

        return responseBuilder(res, StatusCodes.OK, updatedCategory)
    } catch (err) {
        return responseBuilder(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            [],
            true,
            err
        )
    }
})

// category delete
categoryRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deletedCategory = await Category.findByIdAndDelete(id)

        if (!deletedCategory) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: 'Category not found',
            })
        } else {
            return responseBuilder(res, StatusCodes.OK, deletedCategory)
        }
    } catch (err) {
        return responseBuilder(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            [],
            true,
            err
        )
    }
})

// exporting
module.exports = categoryRouter
