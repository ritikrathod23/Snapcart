import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function useGetCategory() {
  const getCategory = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`,{
        withCredentials: true,
      });
      return response.data; // axios wraps response in data property
    } catch (error) {
      console.log(error.message, "can not get data");
    }
  };

    return useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}

export default useGetCategory;
