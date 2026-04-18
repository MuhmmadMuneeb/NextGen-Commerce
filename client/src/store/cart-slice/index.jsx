import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    cart: [],
    isLoading: false,
}

export const allProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async (filtersparams = {}, sortparams = "price-lowtohigh") => {
        const querry = new URLSearchParams({ ...filtersparams, sort: sortparams }).toString()
        const result = await axios.get(`http://localhost:3000/api/shop/products/get?${querry}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return result.data;
    },
);




const productSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allProducts.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(allProducts.rejected, (state) => {
                state.isLoading = false;
                state.cart = [];
            }).addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
              
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.cart = [];
            });
    },
});
export default productSlice.reducer
