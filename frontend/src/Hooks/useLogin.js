import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useProfileIcon } from "../contextApi/ProfileIcon";

function useLogin() {
  const { setUser } = useProfileIcon();
  const loginUser = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/login`, data, {
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
      throw error.response.data.message;
      // console.log(error.message, "can not get data");
    }
  };

  const { mutate,  isPending } = useMutation({
    mutationFn: loginUser,
  });
  return { mutate, isLoading: isPending };
}

export default useLogin;
