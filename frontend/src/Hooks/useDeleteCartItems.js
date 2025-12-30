import { useMutation,  useQueryClient } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

function useDeleteCartItems() {
  const queryClient = useQueryClient()
  const deleteCartItems = async (itemId) => {
    try {
      const res = await axios.delete(`${API_URL}/cart`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
        data: { itemId: itemId },
      });
      console.log("cart item removed successfully: ", res.data);
      return res.data;
    } catch (error) {
      console.log("Error while adding order: ", error);
    }
  };

  const mutateDeleteCartItems = useMutation({
    mutationKey: ["removeCartItem"],
    mutationFn: deleteCartItems,
    onSuccess: (data) => {
      if(data){
        console.log("Item Removed successfully: ", data);
      }
      queryClient.invalidateQueries(["cart"]);
      toast.success("Item Removed successfully");
    },
    onError: (error) => {
      console.error("Error while adding order: ", error);
    },
  });
  return mutateDeleteCartItems;
}

export default useDeleteCartItems;
