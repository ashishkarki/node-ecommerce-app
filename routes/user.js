const bcryptjs = require('bcryptjs')
const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { responseBuilder } = require('../constants')

const UserModel = require('../models/user')

// user router
const userRouter = express.Router()

//ROUTES

// get all users
userRouter.get('/', async (req, res) => {
    const usersList = await UserModel.find().select('-passwordHash')

    if (!usersList) {
        return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
            message: 'No users found',
        })
    } else {
        return responseBuilder(res, StatusCodes.OK, usersList)
    }
})

// get a user by id
userRouter.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await UserModel.findById(id).select('-passwordHash')

        if (!user) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: 'User not found for id: ' + id,
            })
        } else {
            return responseBuilder(res, StatusCodes.OK, user)
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

// post a user
userRouter.post('/', async (req, res) => {
    const newUser = new UserModel({
        ...req.body,
        passwordHash: bcryptjs.hashSync(req.body.password, 10),
    })

    try {
        const savedUser = await newUser.save()

        if (!savedUser) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: 'User not saved',
            })
        } else {
            return responseBuilder(res, StatusCodes.OK, savedUser)
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
module.exports = userRouter
