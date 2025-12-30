const express = require("express");
const {
  getReviewsByProduct,
  addReviewByProducts,
} = require("../controller/reviewController.js");

const verifyToken = require("../middleware/auth.js");

const router = express.Router();

router.get("/reviews/:productId", getReviewsByProduct);

router.post("/reviews",  addReviewByProducts);

module.exports = router;
