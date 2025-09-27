import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";

// Fetch a single specialization by ID
export const getSpclById = createAsyncThunk(
  "specialization/getById",
  async (id) => {
    try {
      const response = await axiosInstance.get(`/specialization/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);

// Fetch all specializations
export const getAllSpcl = createAsyncThunk(
  "specialization/getAll",
  async () => {
    try {
      const response = await axiosInstance.get("/specialization");
      // backend returns { message: "...", specializations: [...] }
      return { success: true, specializations: response.data.specializations };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);

const spclSlice = createSlice({
  name: "specialization",
  initialState: {
    all: [],
    selected: null, // for single specialization if needed
    loading: false,
    error: null,
  },
  reducers: {
    clearSpecializations: (state) => {
      state.all = [];
      state.selected = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // get single specialization
      .addCase(getSpclById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSpclById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.selected = action.payload.data;
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message);
        }
      })
      .addCase(getSpclById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })

      // get all specializations
      .addCase(getAllSpcl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSpcl.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.all = Array.isArray(action.payload.specializations)
            ? action.payload.specializations
            : [];
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message);
        }
      })
      .addCase(getAllSpcl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      });
  },
});

export const { clearSpecializations } = spclSlice.actions;
export default spclSlice.reducer;
