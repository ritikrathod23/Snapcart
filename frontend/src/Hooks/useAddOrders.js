import { useMutation } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

function useAddOrders() {
  const addOrders = async (orderData) => {
    console.log("orderData", orderData);
    try {
      const res = await axios.post(`${API_URL}/order`, orderData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Order added successfully: ", res.data);
      return res.data;
    } catch (error) {
      console.log("Error while adding order: ", error);
    }
  };

  const mutateAddOrders = useMutation({
    mutationFn: addOrders,
    onSuccess: (data) => {
      toast.success("Order placed successfully");
      console.log("Order added successfully: ", data);
    },
    onError: (error) => {
      console.log("Error while adding order: ", error);
    },
  });
  return mutateAddOrders;
}

export default useAddOrders;
