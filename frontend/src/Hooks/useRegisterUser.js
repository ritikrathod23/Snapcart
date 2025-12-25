import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function useRegisterUser() {
  const createUser = async (data) => {
    try {
      const response = await axios.post(`http://localhost:3000/signup`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
        );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.message, "can not get data");
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
