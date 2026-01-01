import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const API_URL = import.meta.env.VITE_API_URL;

function useGetDetails() {
    const getDetails = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin-dash`,{
                withCredentials:true
            })
            return res.data.data
        } catch (error) {
            console.error(error)
        }
    }

    return useQuery({
        queryKey: ['orders'],
        queryFn: getDetails,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1, // Retry once on failure
    })
}

export default useGetDetails;