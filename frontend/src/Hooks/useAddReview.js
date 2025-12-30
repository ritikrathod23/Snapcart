import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

function useAddReview() {

  const addReview = async (reviewData) => {
    try {
      const res = await axios.post(`${API_URL}/reviews`, reviewData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error while adding order: ", error);
    }
  };

  const mutate = useMutation({
    mutationFn: addReview,
    onSuccess: (data) => {
      toast.success("Review added successfully");
      console.error("Review added successfully: ", data);
    },
    onError: (error) => {
      console.error("Error while adding review: ", error);
    },
  });
  return mutate;
}

export default useAddReview;
