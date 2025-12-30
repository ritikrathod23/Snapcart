import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
function useGetFilteredOptions() {
  const {  pathname } = useLocation();


  
    const urlParams = new URLSearchParams(window.location.search);
    let category = urlParams.get("category");
    if(category === null){
      category = pathname.split("/")[1];
    }


  const getFilteredOptions = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/filters?category=${category}`
      );
      return response.data; // axios wraps response in data property
    } catch (error) {
      console.log(error.message, "can not get data");
    }
  };

  return useQuery({
    queryKey: ["products", pathname],
    queryFn: getFilteredOptions,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}
export default useGetFilteredOptions;
