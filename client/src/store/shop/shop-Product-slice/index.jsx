import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    productList: [],
    isLoading: false
}

export const allProducts = createAsyncThunk(
    "products/fetchAllProducts",
    async () => {
        const result = await axios.get("http://localhost:3000/api/shop/products/get", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return result.data;
    },
);

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(allProducts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(allProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productList = action.payload.data || [];
            })
            .addCase(allProducts.rejected, (state) => {
                state.isLoading = false;
                state.productList = [];
            });
    },
});
export default productSlice.reducer
