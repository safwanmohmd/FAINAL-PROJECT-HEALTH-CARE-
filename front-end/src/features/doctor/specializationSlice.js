import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";

// Fetch a single specialization by ID


export const createSpcl = createAsyncThunk(
    "auth/spcl/create",
    async (data) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const response = await axiosInstance.post("/specialization", data, {
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



export const editSpclById = createAsyncThunk(
    "auth/editSpclById",
    async ({ id, updates }) => {
        try {
              const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const response = await axiosInstance.patch(`/specialization/${id}`, updates , {
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


// Fetch all specializations
export const getAllSpcl = createAsyncThunk(
  "specialization/getAll",
  async () => {
    try {
          const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
      const response = await axiosInstance.get("/specialization", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
      // backend returns { message: "...", specializations: [...] }
           return { success: true, ...response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);

const spclSlice = createSlice({
  name: "specialization",
  initialState: {
    allSpcl: [],
    selected: null, // for single specialization if needed
    loading: false,
    error: null,
  },
  reducers: {
    clearSpecializations: (state) => {
      state.allSpcl = [];
      state.selected = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
     
      // get all specializations
      .addCase(getAllSpcl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSpcl.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.allSpcl = action.payload.specializations
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message);
        }
      })
      .addCase(getAllSpcl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })


       .addCase(editSpclById.pending, (state) => {
                      state.loading = true;
                      state.error = null;
                  })
                  .addCase(editSpclById.fulfilled, (state, action) => {
                      state.loading = false;
                      if (action.payload.success) {
      
      
                          toast.success(action.payload.message); // backend success
                      } else {
                          state.error = action.payload.message;
                          toast.error(action.payload.message); // backend error
                      }
                  })


       .addCase(createSpcl.pending, (state) => {
                      state.loading = true;
                      state.error = null;
                  })
                  .addCase(createSpcl.fulfilled, (state, action) => {
                      state.loading = false;
                      if (action.payload.success) {
      
      
                          toast.success(action.payload.message); // backend success
                      } else {
                          state.error = action.payload.message;
                          toast.error(action.payload.message); // backend error
                      }
                  })

  },
});

export const { clearSpecializations } = spclSlice.actions;
export default spclSlice.reducer;
