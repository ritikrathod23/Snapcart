// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// function useGetFilteredProducts() {
//   const { search, pathname } = useLocation();

//   const urlParams = new URLSearchParams(window.location.search);
//   console.log("urlParams", urlParams.toString());

//    const category = pathname.split("/")[1];

//   const getFilteredProducts = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/getProducts?${urlParams.toString()}`
//       );
//       console.log(response.data);
//       return response.data.getAllData; // axios wraps response in data property
//     } catch (error) {
//       console.log(error.message, "can not get data");
//     }
//   };

//   return useQuery({
//     queryKey: ["products", urlParams, pathname],
//     queryFn: getFilteredProducts,
//     staleTime: 1000 * 60 * 5, // 5 minutes cache
//     retry: 3, // Retry 3 times before failing
//     refetchOnWindowFocus: false,
//   });
// }
// export default useGetFilteredProducts;
