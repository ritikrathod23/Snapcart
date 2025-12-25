const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const OrderModel = require("../models/orderModel");
const User = require("../models/userModel");
const orderItemModel = require("../models/orderItemModel");
const Product = require("../models/productsModel");

const createCheckoutSession = async (req, res) => {
  try {
    const { user: userId, orderItems: products } = req.body;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Create orderItems for price calculation
    const orderItems = products.map((p) => ({
      quantity: p.quantity,
      product: p.product,
    }));

    // Fetch product details and calculate amount
    const populatedItems = await orderItemModel
      .find({ _id: { $in: products.map((p) => p.product) } })
      .populate("product");

    if (populatedItems.length === 0) {
      // If orderItems don't exist yet, fetch products directly
      const productIds = products.map((p) => p.product);
      const productDetails = await Product.find({ _id: { $in: productIds } });

      // Create Stripe line items
      const lineItems = products.map((item) => {
        const product = productDetails.find(
          (p) => p._id.toString() === item.product
        );

        return {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name || product.pName,
              images: product.image ? [product.image] : [],
            },
            unit_amount: product.pPrice * 100, // Convert to cents
          },
          quantity: item.quantity,
        };
      });

      const totalAmount = products.reduce((acc, item) => {
        const product = productDetails.find(
          (p) => p._id.toString() === item.product
        );
        return acc + product.pPrice * item.quantity;
      }, 0);

      // Create Stripe Checkout Session
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/cancel`,
        metadata: {
          userId: userId,
          orderItems: JSON.stringify(products), // Store order items for webhook
          shippingAddress: JSON.stringify({
            street: user.street,
            city: user.city,
            country: user.country,
            pincode: user.pincode,
          }),
          totalAmount: totalAmount.toString(),
        }
      });

      return res.json({ url: session.url });
    }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const ordersConfirm = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== 'paid') {
      return res.status(400).json({ message: "Payment not completed." });
    }

    // Check if order already exists for this session
    const existingOrder = await OrderModel.findOne({ stripeSessionId: sessionId });
    if (existingOrder) {
      return res.status(200).json({
        message: "Order already created.",
        order: existingOrder,
      });
    }

    if (session.payment_status === "paid") {
      const userId = session.metadata.userId;
      const orderItems = JSON.parse(session.metadata.orderItems);
      const shippingAddress = JSON.parse(session.metadata.shippingAddress);
      const totalAmount = parseFloat(session.metadata.totalAmount);

      // Now create the order (only after payment succeeds!)
      const createdOrderItems = await orderItemModel.insertMany(
        orderItems.map((p) => ({
          quantity: p.quantity,
          product: p.product,
        }))
      );

      const orderItemIds = createdOrderItems.map((item) => item._id);

      // Create order with payment info
      const order = new OrderModel({
        orderItems: orderItemIds,
        user: userId,
        shippingAddress: shippingAddress,
        amount: totalAmount,
        stripeSessionId: session.id, // Store session ID
        paymentStatus: "paid",
        paidAt: new Date(),
      });

      await order.save();
      res.status(200).json({message: "Order Placed successfully"})

      console.log(`✅ Order created after payment: ${order._id}`);
    } else {
      res.status(400).json({ message: "Payment not completed." });
    }
  } catch (error) {
    console.log("Error confirming order", error.message)
    res.status(500).json({ message: "Error confirming order." });
  }
};

module.exports = {
  createCheckoutSession,
  ordersConfirm,
};
