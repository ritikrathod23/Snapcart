import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function useDeleteOrder() {
const queryClient = useQueryClient();
  const deleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/order/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: (data) => {
      if (data) {
        console.log("Order deleted successfully:", data);
      }
      queryClient.invalidateQueries({queryKey: ['orders'] })
    },
    onError: (error) => {
      console.error("Error deleting order:", error);
    },
  });

  return mutation;
}
export default useDeleteOrder;
