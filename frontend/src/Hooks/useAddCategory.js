import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

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
        `http://localhost:3000/categories`,
        formData,
        {
          // headers: {
          //   "Content-Type": "multipart/form-data ",
          // },
          withCredentials: true,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error, "can not get data");
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
