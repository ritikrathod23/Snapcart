import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function useCheckout() {
  const mutation = useMutation({
    mutationFn: async (data) => {
      console.log("data: " ,data)
      const response = await axios.post(
        "http://localhost:3000/payments/create-checkout-session",
        data,
        { withCredentials: true }
      );
      return response.data; 
    },

    onSuccess: (data) => {
      if (data?.url) {
        window.location.href = data.url; 
      }
    },

    onError: (err) => {
      console.log("Checkout failed:", err);
    }
  });

  return mutation;
}

export default useCheckout;
