import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

function useGetPaymentConfirmation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  console.log("sessionId", sessionId);

  const getPaymentConfirmation = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/payments/orders/create-from-session",
        { sessionId },
        {
          withCredentials: true,
        }
      );
      // toast.success("Order Confirm")
      console.log(":", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching payment confirmation :", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["session"],
    queryFn: getPaymentConfirmation,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}

export default useGetPaymentConfirmation;
