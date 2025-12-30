const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { 
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: String,
        required: true,
    },
    product: {
        ref: 'Product',
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("Review", reviewSchema);
