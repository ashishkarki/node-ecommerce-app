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
            .populate('user', 'name')
            .sort({ dateOrdered: -1 })

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
            .populate('user', 'name')
            // .populate('orderItems')
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: 'category',
                },
            })

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
        const orderItemIds = await orderItemIdPromises

        const totalPricePromises = Promise.all(
            orderItemIds.map(async (oItemId) => {
                const orderItemObjWithProductPrice =
                    await OrderItemModel.findById(oItemId).populate(
                        'product',
                        'price'
                    )

                const totalPriceForThisItem =
                    orderItemObjWithProductPrice.product.price *
                    orderItemObjWithProductPrice.quantity

                return totalPriceForThisItem
            })
        )
        const totalPrices = (await totalPricePromises).reduce(
            (acc, curValue) => acc + curValue,
            0
        )

        console.log(totalPrices)

        const newOrder = new OrderModel({
            ...req.body,
            orderItems: orderItemIds,
            totalPrice: totalPrices,
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

// 4. Update the Status of the order
orderRouter.patch('/:id/status', async (req, res) => {
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
        }

        const updatedOrder = await OrderModel.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            {
                new: true,
            }
        )

        if (!updatedOrder) {
            return responseBuilder(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                [],
                true,
                {
                    message: `Error updating order`,
                }
            )
        } else {
            responseBuilder(res, StatusCodes.OK, updatedOrder)
        }
    })
})

// 5. Delete Order
orderRouter.delete('/:id', async (req, res) => {
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
        }

        const deletedOrder = await OrderModel.findByIdAndDelete(req.params.id)

        if (!deletedOrder) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Order not found for id: ${req.params.id}`,
            })
        } else {
            // first, also delete the orderItems related to this order
            deletedOrder.orderItems.map(async (oItemId) => {
                const deletedOrderItem = await deleteOrderItem(oItemId)
            })

            responseBuilder(res, StatusCodes.OK, deletedOrder)
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
        throw new Error('Error saving order item with id: ', orderItem.id)
    }

    return savedOrderItem
}

// 6. Total sales in the whole eshop - irrespective of user/customer
orderRouter.get('/stats/totalSales', async (req, res) => {
    responseBuilderWrapper(async () => {
        const totalSales = await OrderModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: '$totalPrice' },
                },
            },
        ])

        if (!totalSales) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Error getting total sales`,
            })
        } else {
            responseBuilder(res, StatusCodes.OK, {
                totalSalesOfWholeShop: totalSales.pop().totalSales,
            })
        }
    })
})

// 7. history of a particular user's orders
orderRouter.get('/stats/:userId/history', async (req, res) => {
    // before first check if this id is valid
    if (!mongoose.isValidObjectId(req.params.userId)) {
        return responseBuilder(res, StatusCodes.BAD_REQUEST, [], true, {
            message: `Invalid User id: ${req.params.userId}`,
        })
    }

    responseBuilderWrapper(async () => {
        const userOrders = await OrderModel.find({
            user: req.params.userId,
        })
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    populate: 'category',
                },
            })
            .sort({ dateOrdered: -1 })

        if (!userOrders) {
            return responseBuilder(res, StatusCodes.NOT_FOUND, [], true, {
                message: `Error getting user orders`,
            })
        } else {
            responseBuilder(res, StatusCodes.OK, userOrders)
        }
    })
})

// Helper funciton to delete OrderItem while deleting the parent Order
const deleteOrderItem = async (orderItemId) => {
    // console.log(`orderItemId: ${orderItemId}`)
    const deletedOrderItem = await OrderItemModel.findByIdAndDelete(orderItemId)

    if (!deletedOrderItem) {
        throw new Error('Error deleting order item with id: ', orderItemId)
    }

    return deletedOrderItem
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
