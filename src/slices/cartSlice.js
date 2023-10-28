import { createSlice } from "@reduxjs/toolkit";


let initialState =[]

export const cart = createSlice({
    name: 'cartstore',
    initialState,
    reducers: {
        emptyCart:(state,action)=>{
                return  []
        },
      addToCart: (state, action) => {
        // Check if an item with the same ID is already in the cart
        const existingItem = state.find((item) => item.id === action.payload.id);
  
        if (existingItem) {
          // If the item already exists, update its quantity
          return state.map((item) => {
            if (item.id === action.payload.id) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
        } else {
          // If the item doesn't exist, add it to the cart
          console.log('added', state)
          return [...state, { ...action.payload, quantity: 1 }];
        }
      },
      removeFromCart: (state, action) => {
        return state.filter((item) => item.id !== action.payload.id);
      },
      incrementCount: (state, action) => {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      },
      decrementCount: (state, action) => {
        return state.map((item) => {
          if (item.id === action.payload.id) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        });
      },
    },
  });
  
export const {addToCart,incrementCount,decrementCount,removeFromCart,emptyCart} = cart.actions

export default cart.reducer;