const mongoose = require('mongoose')
const { MONGOOSE_MODEL_NAMES } = require('../constants')

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
    },
    color: {
        type: String,
    },
})

categorySchema.virtual('id').get(function () {
    return this._id.toHexString()
})

categorySchema.set('toJSON', {
    virtuals: true,
})

exports.CategoryModel = mongoose.model(
    MONGOOSE_MODEL_NAMES.CATEGORY,
    categorySchema
)
