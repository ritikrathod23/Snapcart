import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function useAddCategory() {
  const queryClient = useQueryClient();
  const addCategory = async (formDataValues) => {
    try {
      
      const formData = new FormData();

      // Loop through fields dynamically
      Object.entries(formDataValues).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await axios.post(
        `${API_URL}/categories`,
        formData,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data ",
          // },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error, "can not get data");
    }
  };

  const mutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (data) => {
      if (data) {
        console.log("Product added successfully:", data);
      }
      queryClient.invalidateQueries({queryKey: ['category']})
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  return mutation;
}

export default useAddCategory;
