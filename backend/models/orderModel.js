const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    stripeSessionId: {
      type: String,
      unique: true,
    },
    shippingAddress: {
      street: String,
      city: String,
      country: String,
      pincode: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "Pending",
    },
    paidAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);
module.exports = OrderModel;
