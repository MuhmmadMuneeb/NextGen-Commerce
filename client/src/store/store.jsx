import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth_slice";
import adminProductsReducer from "./Admin-product-slice/Index";
import productSlice from "./shop/shop-Product-slice/index.jsx"
import emailReducer from "./email-slice/email.jsx";
import shopCartSlice from "./cart-slice";
import sliderReducer from "./slider-slice/index.jsx";
import popupSlice from "./popup-slice/index.jsx";


const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductsReducer,
    products: productSlice,
    cart: shopCartSlice,
    email: emailReducer,
    slider:sliderReducer,
    popup:popupSlice,
  },
});

export default store;