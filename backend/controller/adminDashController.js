const productsModel = require("../models/productsModel");
const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const reviewModel = require("../models/reviewModel");

const adminDashDetails = async (req, res) => {
  try {
    const totalProducts = await productsModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalUsers = await userModel.countDocuments();
    const totalReviews = await reviewModel.countDocuments();

    return res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalUsers,
        totalReviews,
      },
    });
  } catch (error) {
    console.error("Error fetching admin dashboard details:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { adminDashDetails };
