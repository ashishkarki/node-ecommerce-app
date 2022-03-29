const express = require('express')
const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')

const { responseBuilder } = require('../constants')
const OrderModel = require('../models/order')
const OrderItemModel = require('../models/order-item')

// ROUTER
const orderRouter = express.Router()

// ROUTES

// 1. Get All Orders
orderRouter.get('/', async (req, res) => {
    responseBuilderWrapper(async () => {
        const allOrders = await OrderModel.find()

        if (!allOrders) {
            responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `No orders found`,
            })
        } else {
            responseBuilder(res, StatusCodes.OK, allOrders)
        }
    })
})

// 2. Get Order By Id
orderRouter.get('/:id', async (req, res) => {
    // before first check if this id is valid
    if (!mongoose.isValidObjectId(req.params.id)) {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, {
            message: `Invalid Order id: ${req.params.id}`,
        })
    }

    responseBuilderWrapper(async () => {
        const order = await OrderModel.findById(req.params.id)

        if (!order) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Order not found for id: ${req.params.id}`,
            })
        } else {
            responseBuilder(res, StatusCodes.OK, order)
        }
    })
})

// 3. Create Order
orderRouter.post('/', async (req, res) => {
    responseBuilderWrapper(async () => {
        const orderItemIdPromises = Promise.all(
            req.body.orderItems.map(async (orderItem) => {
                // take this opportunity to also save the OrderItem to the DB
                const newOrderItem = await saveOrderItem(orderItem)

                // the actual return is the id of the saved OrderItem
                return newOrderItem.id
            })
        )

        const newOrder = new OrderModel({
            ...req.body,
            orderItems: await orderItemIdPromises,
        })
        const savedOrder = await newOrder.save()

        if (!savedOrder) {
            return responseBuilder(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                [],
                true,
                {
                    message: `Error saving order`,
                }
            )
        } else {
            responseBuilder(res, StatusCodes.CREATED, savedOrder)
        }
    })
})

// Helper function to save OrderItem while saving a complete order
const saveOrderItem = async (orderItem) => {
    const newOrderItem = new OrderItemModel({
        ...orderItem,
    })

    const savedOrderItem = await newOrderItem.save()

    if (!savedOrderItem) {
        throw new Error('Error saving order item')
    }

    return savedOrderItem
}

// Helper function to build a response using the responseBuilder
const responseBuilderWrapper = (
    tryFxnToExecute = () => {
        throw new Error('Not Implemented!!')
    }
) => {
    try {
        tryFxnToExecute()
    } catch (err) {
        return responseBuilder(
            res,
            StatusCodes.INTERNAL_SERVER_ERROR,
            [],
            true,
            err
        )
    }
}

module.exports = orderRouter
