import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useGetProducts({limit = 10} = {}) {
  const { search, pathname } = useLocation();

  const urlParams = new URLSearchParams(window.location.search);
  let params = urlParams.toString();
  if(params.length > 0){
    params = "&"+params;
  }
  console.log("urlParams", params);

  const category = pathname.split("/")[1];

  const url = params
    ? `http://localhost:3000/getProducts?category=${category}&${params}`
    : `http://localhost:3000/products?category=${category}&{limit=${limit}}`;

  const getProducts = async () => {
    try { 
      const response = await axios.get(url);
      console.log(response.data);
      return response.data.getAllData; // axios wraps response in data property
    } catch (error) { 
      console.log(error.message, "can not get data");
    }
  };

  return useQuery({
    queryKey: ["products", search, pathname],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}
export default useGetProducts;
