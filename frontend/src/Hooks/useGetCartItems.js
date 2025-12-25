import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

function useGetCartItems() {
    const getCartItems = async () => {
        try {
            const response = await axios.get('http://localhost:3000/cart',{
                withCredentials: true,
            })
            console.log('cart data:', response.data)
            return response.data
        } catch (error) {
            console.error('Error fetching cart:', error)
            throw error
        }   
    }

    return useQuery({
    queryKey: ["cart"],
    queryFn: getCartItems,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 3, // Retry 3 times before failing
    refetchOnWindowFocus: false,
  });
}


export default useGetCartItems;