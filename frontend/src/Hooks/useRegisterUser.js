import { useMutation } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function useRegisterUser() {
  const createUser = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
        );
      return response.data;
    } catch (error) {
      console.error(error.message, "can not get data");
    }
  };

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("User registered successfully:", data);
    },
    onError: (error) => {
      console.error("Error registering user:", error);
    }
  })

  return mutation;
}

export default useRegisterUser;
