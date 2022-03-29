const mongoose = require('mongoose')
const { MONGOOSE_MODEL_NAMES } = require('../constants')

const orderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: MONGOOSE_MODEL_NAMES.PRODUCT,
    },
})

orderItemSchema.virtual('id').get(function () {
    return this._id.toHexString()
})

orderItemSchema.set('toJSON', {
    virtuals: true,
})

const OrderItemModel = mongoose.model(
    MONGOOSE_MODEL_NAMES.ORDER_ITEM,
    orderItemSchema
)

module.exports = OrderItemModel
