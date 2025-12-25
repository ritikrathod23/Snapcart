const express = require("express");
const orderItemModel = require("../models/orderItemModel");
const OrderModel = require("../models/orderModel");

const router = express.Router();

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  console.log("webhook hit")
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body, 
      sig, 
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle successful payment
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    try {
      // Extract metadata
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
        paymentStatus: 'paid',
        paidAt: new Date(),
      });
      
      await order.save();
      
      console.log(`✅ Order created after payment: ${order._id}`);
      
      // Optional: Clear user's cart, send confirmation email, etc.
      
    } catch (error) {
      console.error('Error creating order in webhook:', error);
      // Don't return error to Stripe - log it and handle separately
    }
  }
  
  res.json({ received: true });
});


module.exports = router;