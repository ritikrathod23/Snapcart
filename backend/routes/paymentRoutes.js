const express = require("express");

const router = express.Router();

const { createCheckoutSession, ordersConfirm } = require("../controller/paymentController");

router.post("/create-checkout-session", createCheckoutSession);

router.post("/orders/create-from-session", ordersConfirm )

module.exports = router;
