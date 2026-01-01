import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL

function useCheckout() {
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(
        `${API_URL}/payments/create-checkout-session`,
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
      console.error("Checkout failed:", err);
    }
  });

  return mutation;
}

export default useCheckout;
