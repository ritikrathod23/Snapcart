import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function useGetAllOrders() {
    const getAllOrders = async () => {
        try {
            const res = await axios.get("http://localhost:3000/order",{
                withCredentials:true
            })
            console.log(res.data)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    return useQuery({
        queryKey: ['orders'],
        queryFn: getAllOrders,
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 30 * 60 * 1000, // 30 minutes
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        retry: 1, // Retry once on failure
    })
}

export default useGetAllOrders;