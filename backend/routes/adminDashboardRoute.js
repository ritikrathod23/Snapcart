const express = require("express");
const {adminDashDetails} = require("../controller/adminDashController.js")

const router = express.Router();

router.get("/admin-dash", adminDashDetails);


// router.get("/cart", getCart);

module.exports = router;