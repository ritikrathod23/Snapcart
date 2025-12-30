import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function useGetReviews(productId) {
  console.log("useGetReviews called", productId);

  const getReviews = async (productId) => {
    try {
      const response = await axios.get(`${API_URL}/reviews/${productId}`, {
        withCredentials: true,
      });
      console.log("Reviews fetched:", response.data);
      return response.data; // axios wraps response in data property
    } catch (error) {
      console.error(error.message, "can not get data");
    }
  };

  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: () => getReviews(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}
export default useGetReviews;
