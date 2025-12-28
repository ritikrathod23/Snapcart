import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;


function useGetProductDetails() {
    const {pathname} = window.location;
    const {id} = useParams();
    console.log("id in hook",id)
  const getProductDetails = async () => {
    try {
      const response = await axios.get(`${API_URL}/products/${id}`,{
        withCredentials: true,
      });
      console.log(response.data);
      return response.data; // axios wraps response in data property
    } catch (error) {
      console.log(error.message, "can not get data");
    }
  };

    return useQuery({
    queryKey: ["productDetails", pathname],
    queryFn: getProductDetails,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}

export default useGetProductDetails;
