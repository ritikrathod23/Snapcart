import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const API_URL = import.meta.env.VITE_API_URL;

function useGetAllUsers() {
    const getAllUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-users`,{
                withCredentials: true,
            })
            return response.data
        } catch (error) {
            console.error('Error fetching users:', error)
            throw error
        }   
    }

    return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}


export default useGetAllUsers;