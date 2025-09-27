import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";


export const getAllAppmnt = createAsyncThunk(
    "auth/appmnt",
    async (data) => {
        try {
               const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;
            const response = await axiosInstance.get("/appmnt",{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            });

            return { success: true, ...response.data }; // include success flag
        } catch (error) {
            // Return error as data instead of throwing
            return { success: false, message: error.response?.data?.message || error.message };
        }
    }
);

const appmntSlice = createSlice({
    name: "appointment",
    initialState: { user: null, loading: false, error: null, allAppmnt: [] },
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
                    toast.error(action.payload.message); // backend error
                }
            });
    },
});

export const { logout } = appmntSlice.actions;
export default appmntSlice.reducer;
