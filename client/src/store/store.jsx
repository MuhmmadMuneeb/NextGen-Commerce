import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_slice";
import adminProductsReducer from "./Admin-product-slice/Index";
import productSlice from "./shop/shop-Product-slice/index.jsx"
const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductsReducer, 
    products:productSlice
  },
});

export default store;