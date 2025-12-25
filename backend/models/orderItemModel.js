const mongoose = require("mongoose")

const OrderItemSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        // required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
    }
})


const orderItemModel =  mongoose.model("OrderItem", OrderItemSchema );
module.exports = orderItemModel;