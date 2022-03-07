const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    countInStock: {
        type: Number,
    },
})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel
