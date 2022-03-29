const mongoose = require('mongoose')

const { MONGOOSE_MODEL_NAMES } = require('../constants')

const orderSchema = new mongoose.Schema({
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending',
    },
    totalPrice: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MONGOOSE_MODEL_NAMES.USER,
    },
    dateOrdered: {
        type: Date,
        default: Date.now,
    },
})

orderSchema.virtual('id').get(() => this._id.toHexString())

orderSchema.set('toJSON', {
    virtuals: true,
})

const OrderModel = mongoose.model(MONGOOSE_MODEL_NAMES.ORDER, orderSchema)

module.exports = OrderModel
