import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  sliders: [],
  isLoading: false,
  error: null,
};

// --- API BASE URL ---
const API_URL = "http://localhost:3000/api/slider";

/**
 * --- ASYNC THUNKS ---
 */

// 1. ADD: Send FormData for Multer processing
export const addSlider = createAsyncThunk(
  "slider/addSlider",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 2. GET ALL: For Admin Management
export const getSliders = createAsyncThunk(
  "slider/getSliders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 3. UPDATE: Modify details or swap image
export const updateSlider = createAsyncThunk(
  "slider/updateSlider",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 4. DELETE: Remove from database
export const deleteSlider = createAsyncThunk(
  "slider/deleteSlider",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return { id, message: response.data.message };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 5. TOGGLE: Change isActive status without deleting
export const toggleSliderStatus = createAsyncThunk(
  "slider/toggleSliderStatus",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/toggle/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 6. GET ACTIVE: For Public Frontend Home Page
export const getActiveSliders = createAsyncThunk(
  "slider/getActiveSliders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/public/get`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

/**
 * --- SLICE DEFINITION ---
 */

const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All (Admin)
      .addCase(getSliders.pending, (state) => { state.isLoading = true; })
      .addCase(getSliders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sliders = action.payload.data;
      })
      .addCase(getSliders.rejected, (state) => { state.isLoading = false; })

      // Fetch Active (Public)
      .addCase(getActiveSliders.fulfilled, (state, action) => {
        state.sliders = action.payload.data;
      })

      // Add Slider
      .addCase(addSlider.fulfilled, (state, action) => {
        state.sliders.push(action.payload.data);
      })

      // Update Slider
      .addCase(updateSlider.fulfilled, (state, action) => {
        const index = state.sliders.findIndex(s => s._id === action.payload.data._id);
        if (index !== -1) {
          state.sliders[index] = action.payload.data;
        }
      })

      // Toggle Status
      .addCase(toggleSliderStatus.fulfilled, (state, action) => {
        const index = state.sliders.findIndex(s => s._id === action.payload.data._id);
        if (index !== -1) {
          state.sliders[index].isActive = action.payload.data.isActive;
        }
      })

      // Delete Slider
      .addCase(deleteSlider.fulfilled, (state, action) => {
        state.sliders = state.sliders.filter(s => s._id !== action.payload.id);
      });
  },
});

export default sliderSlice.reducer;