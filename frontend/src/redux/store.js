import { configureStore ,} from "@reduxjs/toolkit";

import cartReducer from './actions'


const store = configureStore({
    reducer: {
        cart: cartReducer,
    }
    
});

export default store;
