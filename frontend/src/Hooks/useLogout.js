import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

function useLogout() {
  const logout = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/logout`,{},{
        withCredentials: true,
      });
      console.log(response.data);
      if( response.data ){
        localStorage.clear("user"); 
        Cookies.remove("token");
      }
      return response.data;
    } catch (error) {
      console.log(error.message, "can not get data");
    }
  };


  const mutation = useMutation({
    mutationKey: ["user-logout"],
    mutationFn: logout,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
  return mutation;
}

export default useLogout;
