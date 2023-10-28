
import { configureStore } from "@reduxjs/toolkit";
import userslice from "../slices/userslice";
import cartSlice from "../slices/cartSlice";

export const  store = configureStore({
    reducer:{
        userstore:userslice,
        cartstore:cartSlice
    }
})