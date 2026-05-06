import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    success: false,
    isLoading: false,
    sessionId: null,
    error: null
};
const API_URL = "http://localhost:3000/api/stripe";


export const paymentVerification = createAsyncThunk(
    "stripe/payment",
    async (cartProduct) => {
        try {
            const response = await axios.post(
                `${API_URL}/payment`,
                { product: cartProduct },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                },
            );
            return response.data;
        } catch (error) {
            console.log(error)
        }
    }
);
export const clearCart = createAsyncThunk(
    "cart/clear",
    async () => {
        const response = await axios.delete(
            "http://localhost:3000/api/shop/cart/clear",
            { withCredentials: true }
        );
        return response.data;
    }
);

const stripeSlice = createSlice({
    name: "Stripe",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(paymentVerification.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(paymentVerification.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = action.payload.success;
                state.sessionId = action.payload.id;
            })
            .addCase(paymentVerification.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            });
    }
})

export default stripeSlice.reducer