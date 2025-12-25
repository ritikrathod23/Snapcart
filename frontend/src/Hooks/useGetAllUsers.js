import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function useGetAllUsers() {
    const getAllUsers = async () => {
        try {
            const response = await axios.get('http://localhost:3000/get-users',{
                withCredentials: true,
            })
            console.log('All users data:', response.data)
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