import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    productList: [],
    isLoading: false,
    productDetails: null
}

export const allProducts = createAsyncThunk(
  "products/fetchAllProducts",
  // Destructure the single argument into filterParams and sortParams
  async ({ filterParams, sortParams }) => {
    
    // Create query string: Use 'sortBy' to match your backend controller
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams || "price-lowtohigh",
    }).toString();

    const result = await axios.get(
      `http://localhost:3000/api/shop/products/get?${query}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const result = await axios.get(
      `http://localhost:3000/api/shop/products/getDetails/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    console.log(result.data)

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
            }).addCase(fetchProductDetails.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetails = action.payload.data;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.isLoading = false;
                state.productDetails = [];
            });
    },
});
export default productSlice.reducer
