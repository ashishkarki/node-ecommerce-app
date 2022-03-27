const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const express = require('express')
const { StatusCodes } = require('http-status-codes')
const { responseBuilder, COMPONENT_SUB_PATHS } = require('../constants')

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

// Create a user
userRouter.post('/', async (req, res) => {
    const newUser = new UserModel({
        ...req.body,
        passwordHash: await bcryptjs.hash(req.body.password, 10),
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

// login user
userRouter.post(COMPONENT_SUB_PATHS.LOGIN, async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await UserModel.findOne({ email })

        if (!user) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: 'User not found for email: ' + email,
            })
        } else {
            const matchedPw = await bcryptjs.compare(
                password ?? '',
                user.passwordHash
            )

            if (matchedPw) {
                // also generate a token for user to sign back in
                const token = jwt.sign(
                    {
                        userId: user.id,
                        isAdmin: user.isAdmin,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1d',
                    }
                )

                return responseBuilder(res, StatusCodes.OK, {
                    user: user.email,
                    token,
                })
            } else {
                return responseBuilder(
                    res,
                    StatusCodes.UNAUTHORIZED,
                    [],
                    true,
                    {
                        message: 'Invalid Credentials!!',
                    }
                )
            }
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

// delete a user
userRouter.delete('/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await UserModel.findById(id)

        if (!user) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: 'User not found for id: ' + id,
            })
        } else {
            const deletedUser = await UserModel.findByIdAndDelete(id)

            return responseBuilder(res, StatusCodes.OK, {
                message: `User with id: ${deletedUser.id} deleted`,
            })
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
