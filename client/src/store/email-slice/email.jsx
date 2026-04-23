import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isLoading: false,
    success: false,
    message: "",
    error: null
};

export const sendEmail = createAsyncThunk(
    "email/send",
    async (emailData, { rejectWithValue }) => {
        try {
            const result = await axios.post(
                "http://localhost:3000/api/sendmail/send",
                emailData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return result.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Something went wrong");
        }
    }
);

const emailSlice = createSlice({
    name: "email",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(sendEmail.pending, (state) => {
                state.isLoading = true;
                state.success = false;
            })
            .addCase(sendEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(sendEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.success = false;
                state.error = action.payload;
            });
    },
});

export default emailSlice.reducer;