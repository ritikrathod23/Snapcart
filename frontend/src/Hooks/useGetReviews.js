import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetReviews({productId}) {

  const getReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/reviews/${productId}`,{ withCredentials: true }
      );
      console.log("get", response.data);
      return response.data; // axios wraps response in data property
    } catch (error) {
      console.log(error.message, "can not get data");
    }
  };

  return useQuery({ 
    queryKey: ["reviews"],
    queryFn: getReviews,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}
export default useGetReviews;
