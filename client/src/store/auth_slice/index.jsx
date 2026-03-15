import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";
const initialState = {
    isLoading: true,
    isAuthenticated: false,
    user: null,
}
export const registerUser = createAsyncThunk(
    "auth/register",
    async (formdata, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                "http://localhost:3000/api/auth/register",
                formdata,
                { withCredentials: true }
            );
            return response.data;
        } catch (error) {
            // send proper error message to rejected case
            return rejectWithValue(error.response?.data?.message || "Registration failed");
        }
    }
);
export const loginUser = createAsyncThunk("auth/login", async () => {
    const response = await axios.post("http://localhost:3000/api/auth/login", formdata, { withCredentials: true })
    return response.data
})
export const logoutUser = createAsyncThunk(
    "/auth/logout",
    async () => {
        const response = await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
        return response.data

    }
)
export const checkAuth = createAsyncThunk(
    "/auth/check-auth",
    async () => {
        const response = await axios.get("http://localhost:3000/api/auth/check-auth", { withCredentials: true })
        return response.data

    }
)
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => { }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true
        }).addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload.user
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true
        }).addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = true
            state.user = action.payload.user
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
        }).addCase(checkAuth.pending, (state) => {
            state.isLoading = true
        }).addCase(checkAuth.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload?.user || null
            state.isAuthenticated = !!action.payload?.user
        }).addCase(checkAuth.rejected, (state) => {
            state.isLoading = false
            state.isAuthenticated = false
            state.user = null
        }).addCase(logoutUser.fulfilled, (state) => {
            state.isAuthenticated = false
            state.user = null
        })
    }
})
export const { setUser } = authSlice.actions
export default authSlice.reducer