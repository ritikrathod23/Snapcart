const express = require("express");
const router = express.Router();
const { login, register, logout } = require("../controller/authController");
const verifyToken = require('../middleware/auth')

router.post("/login", login);

router.post("/signup", register);

router.post("/logout", logout);

// routes/auth.js


// Verify token route
router.get('/verify', verifyToken, (req, res) => {
  res.status(200).json({
    message: 'Token is valid',
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      isAdmin: req.user.isAdmin,
      // Don't send sensitive data
    }
  });
});

module.exports = router;

module.exports = router;
