import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";


export const getAllAppmnt = createAsyncThunk(
    "auth/appmnt",
    async (data) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const response = await axiosInstance.get("/appmnt", {
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

export const createAppmnt = createAsyncThunk(
    "auth/appmtn/create",
    async (data) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const response = await axiosInstance.post("/appmnt", data, {
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

export const getMyAppmnt = createAsyncThunk(
    "auth/getmyappmnt",
    async (data) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const response = await axiosInstance.get("/appmnt/getmy", {
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

export const editApmntById = createAsyncThunk(
  "auth/editApmntById",
  async ({ id, updates }) => {
    try {
      const response = await axiosInstance.patch(`/appmnt/${id}`, updates);
      return { success: true, user: response.data.user, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);
export const deleteAppmntById = createAsyncThunk(
  "auth/deleteAppmntById",
  async (id) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
      const response = await axiosInstance.delete(`/appmnt/${id}`, {
        headers:{
            Authorization : `Bearer ${token}`
        }
      });
      return { success: true, user: response.data.user, message: response.data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);

const appmntSlice = createSlice({
    name: "appointment",
    initialState: { user: null, loading: false, error: null, allAppmnt: [], myAppmnt : [] },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllAppmnt.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getAllAppmnt.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.allAppmnt = action.payload.appointments;
                    toast.success(action.payload.message); // backend success
                } else {
                    state.error = action.payload.message;
                    toast.error(action.payload.message);
                    if (action.payload.message === "jwt expired") {
                        toast.error("Session expired. Please login again.");
                        state.user = null;
                        localStorage.removeItem("user");  // remove whole user, not just token
                        window.location.href = "/login";  // force redirect
                    }
                }
            })


        .addCase(getMyAppmnt.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getMyAppmnt.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    state.myAppmnt = action.payload.appointments;
                    toast.success(action.payload.message); // backend success
                } else {
                    state.error = action.payload.message;
                    toast.error(action.payload.message);
                    if (action.payload.message === "jwt expired") {
                        toast.error("Session expired. Please login again.");
                        state.user = null;
                        localStorage.removeItem("user");  // remove whole user, not just token
                        window.location.href = "/login";  // force redirect
                    }
                }
            })



        .addCase(createAppmnt.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(createAppmnt.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.success) {
                    toast.success(action.payload.message); // backend success
                } else {
                    state.error = action.payload.message;
                    toast.error(action.payload.message);
                    if (action.payload.message === "jwt expired") {
                        toast.error("Session expired. Please login again.");
                        state.user = null;
                        localStorage.removeItem("user");  // remove whole user, not just token
                        window.location.href = "/login";  // force redirect
                    }
                }
            })

              .addCase(editApmntById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(editApmntById.fulfilled, (state, action) => {
                    state.loading = false;
                    if (action.payload.success) {
                    
                 
                      toast.success(action.payload.message); // backend success
                    } else {
                      state.error = action.payload.message;
                      toast.error(action.payload.message); // backend error
                    }
                  })



              .addCase(deleteAppmntById.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                  })
                  .addCase(deleteAppmntById.fulfilled, (state, action) => {
                    state.loading = false;
                    if (action.payload.success) {
                    
                 
                      toast.success(action.payload.message); // backend success
                    } else {
                      state.error = action.payload.message;
                      toast.error(action.payload.message); // backend error
                    }
                  });

    },
});

export const { logout } = appmntSlice.actions;
export default appmntSlice.reducer;
