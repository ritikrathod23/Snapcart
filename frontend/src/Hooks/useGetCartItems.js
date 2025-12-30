import React from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../contextApi/AuthContextProvider.jsx";
const API_URL = import.meta.env.VITE_API_URL;

function useGetCartItems() {
  const { user } = useAuth();
  const getCartItems = async () => {
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching cart:", error);
      throw error;
    }
  };

  return useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}

export default useGetCartItems;
