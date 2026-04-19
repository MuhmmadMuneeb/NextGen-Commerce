import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_slice";
import adminProductsReducer from "./Admin-product-slice/Index";
import productSlice from "./shop/shop-Product-slice/index.jsx"
import shopCartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductsReducer, 
    products:productSlice,
    cart: shopCartSlice, // Ensure this is imported correctly
  },
});

export default store;