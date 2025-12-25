const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
        default: "India"
    },
    pincode: {
        type: Number,
    },
    phone: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now()
    }

});

module.exports = mongoose.model("User", userSchema);
