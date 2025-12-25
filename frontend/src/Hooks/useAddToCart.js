import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function useAddToCart() {
  const queryClient = useQueryClient();
  const addToCart = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/cart`, data, {
        // headers: {
        //   "Content-Type": "multipart/form-data ",
        // },
        withCredentials: true,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "can not get data");
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
