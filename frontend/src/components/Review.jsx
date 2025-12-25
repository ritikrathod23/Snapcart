import { Rating } from "@material-tailwind/react";
import React from "react";
import useGetReviews from "../Hooks/useGetReviews";

function Review({review}) {
 
  return (
    <div>
      <div className=" shadow-md  p-4 rounded-lg my-8">
        <div className="pl-12 flex items-center gap-16 mb-2">
          <img
            className="w-12 h-12 object-cover bg-gray-300 rounded-full flex items-center justify-center"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/250px-Outdoors-man-portrait_%28cropped%29.jpg"
            alt=""
          />
          <span className="font-semibold text-2xl ">{review?.user?.name}</span>
          <Rating value={4} readonly />
        </div>
        <div className="my-5 pl-12 text-gray-700 ">
          <p>
            {review?.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Review;
