import { useMutation,  useQueryClient } from "@tanstack/react-query";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useDeleteCartItems() {
  const queryClient = useQueryClient()
  const deleteCartItems = async (itemId) => {
    try {
      const res = await axios.delete("http://localhost:3000/cart", {
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
      queryClient.invalidateQueries(["cart"]);
      toast.success("Item Removed successfully");
      console.log("Item Removed successfully: ", data);
    },
    onError: (error) => {
      console.log("Error while adding order: ", error);
    },
  });
  return mutateDeleteCartItems;
}

export default useDeleteCartItems;
