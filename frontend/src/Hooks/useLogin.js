import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useProfileIcon } from "../contextApi/ProfileIcon";
const API_URL = import.meta.env.VITE_API_URL;

function useLogin() {
  const { setUser } = useProfileIcon();
  const loginUser = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        setUser(true);
      }
      return response.data;
    } catch (error) {
      // console.log(error.message, "can not get data");
      throw error.response.data.message;
    }
  };

  const { mutate,  isPending } = useMutation({
    mutationFn: loginUser,
  });
  return { mutate, isLoading: isPending };
}

export default useLogin;
