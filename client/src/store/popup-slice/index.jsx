import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  popups: [],
  activePopup: null, // Holds the single live popup for the frontend
  isLoading: false,
  error: null,
};

const API_URL = "http://localhost:3000/api/popup";

/**
 * --- ASYNC THUNKS ---
 */

// 1. CREATE: Add new popup template
export const createPopup = createAsyncThunk(
  "popup/createPopup",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response)
      return response.data;

    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 2. GET ALL: For Admin Management List
export const getAllPopups = createAsyncThunk(
  "popup/getAllPopups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 3. GET LIVE: For Public Website View
export const getLivePopup = createAsyncThunk(
  "popup/getLivePopup",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/live`);
      console.log(response)
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 4. UPDATE: Modify content or settings
export const updatePopup = createAsyncThunk(
  "popup/updatePopup",
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

// 5. TOGGLE: Activate/Deactivate (Handles exclusive logic)
export const togglePopupActive = createAsyncThunk(
  "popup/togglePopupActive",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`${API_URL}/toggle/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// 6. DELETE: Permanent Removal
export const deletePopup = createAsyncThunk(
  "popup/deletePopup",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`);
      return { id };
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

/**
 * --- SLICE DEFINITION ---
 */

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    clearActivePopupUI: (state) => {
      state.activePopup = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Fetch All */
      .addCase(getAllPopups.pending, (state) => { state.isLoading = true; })
      .addCase(getAllPopups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popups = action.payload.data;
      })
      .addCase(getAllPopups.rejected, (state) => { state.isLoading = false; })

      /* Fetch Live */
      .addCase(getLivePopup.fulfilled, (state, action) => {
        state.activePopup = action.payload.data;
      })

      /* Create */
      .addCase(createPopup.fulfilled, (state, action) => {
        state.popups.unshift(action.payload.data);
      })

      /* Update */
      .addCase(updatePopup.fulfilled, (state, action) => {
        const index = state.popups.findIndex(p => p._id === action.payload.data._id);
        if (index !== -1) state.popups[index] = action.payload.data;
        // Also update activePopup if the edited one was currently live
        if (state.activePopup?._id === action.payload.data._id) {
          state.activePopup = action.payload.data;
        }
      })

      /* Toggle Active Status (Exclusive Logic) */
      .addCase(togglePopupActive.fulfilled, (state, action) => {
        const updatedPopup = action.payload.data;
        
        // If we activated a popup, set all others to false in local state
        if (updatedPopup.isActive) {
          state.popups = state.popups.map(p => ({
            ...p,
            isActive: p._id === updatedPopup._id
          }));
          state.activePopup = updatedPopup;
        } else {
          // If we deactivated it, just update that specific one
          const index = state.popups.findIndex(p => p._id === updatedPopup._id);
          if (index !== -1) state.popups[index].isActive = false;
          state.activePopup = null;
        }
      })

      /* Delete */
      .addCase(deletePopup.fulfilled, (state, action) => {
        state.popups = state.popups.filter(p => p._id !== action.payload.id);
        if (state.activePopup?._id === action.payload.id) state.activePopup = null;
      });
  },
});

export const { clearActivePopupUI } = popupSlice.actions;
export default popupSlice.reducer;