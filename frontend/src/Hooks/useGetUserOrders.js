import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useProfileIcon } from "../contextApi/ProfileIcon";
const API_URL = import.meta.env.VITE_API_URL;

function useGetUserOrders() {
  const { myUser } = useProfileIcon();
  const id = myUser?.user?._id; 

  const getUserOrders = async () => {
    if (!id) return null;
    try {
      const response = await axios.get(`${API_URL}/orders/user/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.log(error.message, "can not get data");
    }
  };

  return useQuery({
    queryKey: ["userOrders", id],
    queryFn: getUserOrders,
    enabled: false,
    staleTime: 1000 * 60 * 5,
    retry: 3,
    refetchOnWindowFocus: false,
  });
}
export default useGetUserOrders;
