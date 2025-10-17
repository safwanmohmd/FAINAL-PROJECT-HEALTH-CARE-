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
  async () => {
    try {
          const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
      const response = await axiosInstance.get("/auth/doctors", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
      return { success: true, ...response.data }; // include success flag
    } catch (error) {
      // Return error as data instead of throwing
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);

export  const getUserHistory =  createAsyncThunk(
  "auth/history",
  async (patientId) => {
    try {
      const response = await axiosInstance.get(`http://localhost:3000/api/auth/history/${patientId}`);
     return { success: true, ...response.data };
       // include success flag
    } catch (error) {
      // Return error as data instead of throwing
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);


export const getAllUsers = createAsyncThunk(
  "auth/users",
  async (data) => {
    try {
          const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
      const response = await axiosInstance.get("/auth/users", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
    
      return { success: true, ...response.data };
       // include success flag
    } catch (error) {
      // Return error as data instead of throwing
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);


export const editUserById = createAsyncThunk(
  "auth/editUserById",
  async ({ id, updates }) => {
    try {
          const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
      const response = await axiosInstance.patch(`/auth/${id}`, updates , {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
      return { success: true, user: response.data.user, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, loading: false, error: null, allDoctors:[] ,allUsers :[], userHistory : []},
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
           
          toast.success(action.payload.message);
          if(state.user.role == "admin"){
 window.location.href = "/doctor/dashboard";
          } else{
             window.location.href = "/";
          }
          // backend success
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
      })



      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
       
          state.allUsers = action.payload.users;
          toast.success(action.payload.message); // backend success
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message); // backend error
        }
      })


      .addCase(editUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
        
     
          toast.success(action.payload.message); // backend success
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message); // backend error
        }
      }) 


      .addCase(getUserHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserHistory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
        
     state.userHistory = action.payload.data
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
