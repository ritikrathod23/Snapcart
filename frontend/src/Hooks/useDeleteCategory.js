import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function useDeleteCategory() {
    const queryClient = useQueryClient();
  const deleteCategory = async (cid) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/categories`,

        {
          data: { cid: cid },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (data) => {
      if (data) {
        console.log("Category deleted successfully:", data);
      }
      queryClient.invalidateQueries({queryKey: ['category'] })
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });

  return mutation;
}
export default useDeleteCategory;
