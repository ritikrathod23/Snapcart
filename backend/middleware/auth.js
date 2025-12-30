// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
     const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Find user by ID from token
    const user = await User.findById(decoded.userid).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = verifyToken;
