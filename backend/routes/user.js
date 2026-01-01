const express = require("express");
const router = express.Router();
const { allUsers, userDetails } = require("../controller/userController");

router.get("/get-users", allUsers);
router.get("/get-user/:id", userDetails);


module.exports = router;
