import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function useGetAllProducts() {
  const getAllProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/products`,{
        withCredentials: true,
      });
      return response.data.getAllData;
    } catch (error) {
      console.error(error.message, "can not get data");
    }
  };

  return useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}
export default useGetAllProducts;
