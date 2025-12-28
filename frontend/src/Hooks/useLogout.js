import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
const API_URL = import.meta.env.VITE_API_URL;

function useLogout() {
  const logout = async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`,{},{
        withCredentials: true,
      });
      console.log(response.data);
      if( response.data ){
        localStorage.removeItem("user");
        Cookies.remove("token", { path: "/" });
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
