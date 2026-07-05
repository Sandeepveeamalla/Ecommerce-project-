import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice.js';
import cartReducer from '../features/cart/cartSlice.js';

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});