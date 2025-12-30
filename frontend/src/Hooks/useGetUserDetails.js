import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../contextApi/AuthContextProvider";
const API_URL = import.meta.env.VITE_API_URL;

function useGetUserDetails() {
    const { user } = useAuth();
  const id = user?.id;

  const getUserDetails = async () => {
    if (!id) return null;
    try {
      const response = await axios.get(`${API_URL}/get-user/${id}`, {
        withCredentials: true,
      });
      return response.data; // axios wraps response in data property
    } catch (error) {
      console.error(error.message, "can not get data");
    }
  };

  return useQuery({
    queryKey: ["userDetails", id],
    queryFn: getUserDetails,
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}
export default useGetUserDetails;
