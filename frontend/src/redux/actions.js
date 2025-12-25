import { createSlice } from "@reduxjs/toolkit";

// Get the initial cart data from localStorage
const getInitialCart = () => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = getInitialCart();

export const cartSlice = createSlice({
    name: 'cartItems', // Unique name for the slice
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
            localStorage.setItem("cart", JSON.stringify(state));
        },
        deleteItem: (state, action) => {
            const updated = state.filter(item => item.pid !== action.payload.pid)
            localStorage.setItem("cart", JSON.stringify(updated));
            return updated;
        },
        addQty: (state, action) => {
            const index = state.findIndex(item => item.pid === action.payload.pid);
        
            if (index !== -1) {
                // Get the existing item and increment its quantity
                state[index].quantity += 1;
                
                // Update local storage with the new state
                localStorage.setItem("cart", JSON.stringify(state));
            }
        },
        deleteQty: (state, action) => {
            const index = state.findIndex(item => item.pid === action.payload.pid);
        
            if (index !== -1) {
                // Get the existing item and increment its quantity
                if(state[index].quantity > 1){
                    state[index].quantity -= 1;
                }
                
                // Update local storage with the new state
                localStorage.setItem("cart", JSON.stringify(state));
            }
        },
        
    },
});

// Export the actions and reducer
export const { addItem, deleteItem, addQty, deleteQty } = cartSlice.actions;
export default cartSlice.reducer;
