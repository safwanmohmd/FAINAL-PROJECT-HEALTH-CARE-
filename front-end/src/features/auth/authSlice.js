import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";

// Thunk without throw or rejectWithValue
export const registerUser = createAsyncThunk(
  "auth/register",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      return { success: true, ...response.data }; // include success flag
    } catch (error) {
      // Return error as data instead of throwing
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
     localStorage.setItem("user", JSON.stringify(response.data.user));
      return { success: true, ...response.data }; // include success flag
    } catch (error) {
      // Return error as data instead of throwing
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);
export const getAllDoctors = createAsyncThunk(
  "auth/doctors",
  async (data) => {
    try {
      const response = await axiosInstance.get("/auth/doctors");
    
      return { success: true, ...response.data }; // include success flag
    } catch (error) {
      // Return error as data instead of throwing
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null, allDoctors:[] },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          toast.success(action.payload.message); // backend success
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message); // backend error
        }
      })

      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
           
          toast.success(action.payload.message); // backend success
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message); // backend error
        }
      })


      .addCase(getAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.allDoctors = action.payload.doctors;
          toast.success(action.payload.message); // backend success
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message); // backend error
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
