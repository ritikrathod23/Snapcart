const Review = require("../models/reviewModel.js");

const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  console.log("Fetching reviews for productId:", productId);
  try {
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    res.status(200).json(reviews, { message: "Reviews fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

const addReviewByProducts = async (req, res) => {
  const { userId, productId, review, rating } = req.body;
  try {
    const newReview = new Review({
      user: userId,
      product: productId,
      review: review,
      rating: rating,
    });
    await newReview.save();
    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

module.exports = { getReviewsByProduct, addReviewByProducts };
