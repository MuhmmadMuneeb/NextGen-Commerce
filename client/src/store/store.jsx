import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_slice";
import adminProductsReducer from "./Admin-product-slice/Index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductsReducer, // <-- match your slice name
  },
});

export default store;