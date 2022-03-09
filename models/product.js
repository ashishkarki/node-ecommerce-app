const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    richDescription: {
        type: String,
        default: '<h4>Product Description</h4>',
    },
    image: {
        type: String,
        default: 'https://unsplash.com/photos/DXQB5D1njMY',
    },
    images: [
        {
            type: String,
        },
    ],
    brand: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
        min: 0,
        max: 255,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

const ProductModel = mongoose.model('Product', productSchema)

module.exports = ProductModel
