import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function useAddToCart() {
  const queryClient = useQueryClient();
  const addToCart = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/cart`, data, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error(error, "can not get data");
    }
  };

  const mutation = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      if (data) {
        console.log("Product added successfully:", data);
      }
      
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  return mutation;
}

export default useAddToCart;
