const express = require("express");
const { addToCart, getCart, deleteCartItems } = require("../controller/cartController.js");

const router = express.Router();

router.post("/cart", addToCart);


router.get("/cart", getCart);


router.delete("/cart", deleteCartItems)

module.exports = router;
