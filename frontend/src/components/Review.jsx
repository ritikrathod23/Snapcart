import { Rating } from "@material-tailwind/react";
import React, { useState } from "react";
import useGetReviews from "../Hooks/useGetReviews";
import { FaStar, FaPlus, FaTrash } from "react-icons/fa";
import useAddReview from "../Hooks/useAddReview";
import { useParams } from "react-router-dom";
import { useAuth } from "../contextApi/AuthContextProvider";

function Review({ review }) {
  const { id: productId } = useParams();
  const { data: reviewsData } = useGetReviews(productId);
  const { mutate } = useAddReview();
  // const { data: reviews } = useGetReviews();
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();
  const userId = user?.id;

  const handleAddReview = () => {
    setReviews([...reviews, { review: "", rating: 0 }]);
    setShowForm(true);
  };

  const handleRemoveReview = (id) => {
    setReviews(reviews.filter((review) => review.id !== id));
    if (reviews.length === 1) setShowForm(false);
  };

  const handleInputChange = (id, field, value) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, [field]: value } : review
      )
    );
  };
  const payload = {
    userId: userId,
    productId: productId,
    review: reviews?.[0]?.review,
    rating: reviews?.[0]?.rating,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(payload);
    setReviews([]);
    setShowForm(false);
  };

  // if (!review) {
  //   return <div className="">No review available</div>;
  // }
  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Product Reviews</h2>
      {reviewsData &&
        reviewsData.map((review) => (
          <div
            key={review._id}
            className="bg-white shadow-md my-6 rounded-lg p-4 border border-gray-200 w-full md:96"
          >
            {/* User */}
            <h3 className="text-lg font-semibold text-gray-800">
              {review?.user?.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center mt-1">
              {review.rating && [...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-4 w-4 ${
                    i < review?.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="text-gray-600 mt-2">{review?.review}</p>
          </div>
        ))}

      {/* Add Review Button */}
      {!showForm && (
        <button
          onClick={handleAddReview}
          className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FaPlus className="text-sm" />
          Write a Review
        </button>
      )}

      {/* Dynamic Review Forms */}
      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-5  relative"
            >
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => handleRemoveReview(review.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors"
              >
                <FaTrash className="text-lg" />
              </button>

              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Review #{index + 1}
              </h3>

              {/* Rating Stars */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      onClick={() =>
                        handleInputChange(review.id, "rating", star)
                      }
                      className={`text-2xl cursor-pointer transition-colors ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Review Textarea */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={review.review}
                  onChange={(e) =>
                    handleInputChange(review.id, "review", e.target.value)
                  }
                  placeholder="Share your detailed thoughts about this product"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>
            </div>
          ))}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Reviews
            </button>

            <button
              type="button"
              onClick={() => {
                setReviews([]);
                setShowForm(false);
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Review;
