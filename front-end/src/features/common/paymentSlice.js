import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";

// Fetch a single specialization by ID


export const createPayment = createAsyncThunk(
    "auth/payment/create",
    async (data) => {
        try {
            const response = await axiosInstance.post("/payment", data);
           const paymentId = response.data.newPayment._id; 
      localStorage.setItem("pendingPaymentId", paymentId);
            return { success: true, ...response.data };
        } catch (error) {
           
            return { success: false, message: error.response?.data?.message || error.message };
        }
    }
);



export const editPaymentById = createAsyncThunk(
    "auth/editPaymentById",
    async ({ id, updates }) => {
        try {
              const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
            const response = await axiosInstance.patch(`/payment/${id}`, updates, {
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
export const getAllPayment = createAsyncThunk(
  "specialization/getAll",
  async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
      const response = await axiosInstance.get("/payment", {
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
export const getMyPayment = createAsyncThunk(
  "payment/getmy",
  async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));
            const token = user?.token;
      const response = await axiosInstance.get("/payment/getmy", {
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

const paymentSlice = createSlice({
  name: "specialization",
  initialState: {
    allPayments: [],
    myPayments : [],
    selected: null, // for single specialization if needed
    loading: false,
    error: null,
  },
  reducers: { },
  extraReducers: (builder) => {
    builder
     
      // get all specializations
      .addCase(getAllPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPayment.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.allPayments = action.payload.payments
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message);
        }
      })
      .addCase(getAllPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        toast.error(action.error.message);
      })


       .addCase(editPaymentById.pending, (state) => {
                      state.loading = true;
                      state.error = null;
                  })
                  .addCase(editPaymentById.fulfilled, (state, action) => {
                      state.loading = false;
                      if (action.payload.success) {
      
      
                          toast.success(action.payload.message); // backend success
                      } else {
                          state.error = action.payload.message;
                          toast.error(action.payload.message); // backend error
                      }
                  })


       .addCase(createPayment.pending, (state) => {
                      state.loading = true;
                      state.error = null;
                  })
                  .addCase(createPayment.fulfilled, (state, action) => {
                      state.loading = false;
                      if (action.payload.success) {
      
      
                          toast.success(action.payload.message); // backend success
                      } else {
                          state.error = action.payload.message;
                          toast.error(action.payload.message); // backend error
                      }
                  })


       .addCase(getMyPayment.pending, (state) => {
                      state.loading = true;
                      state.error = null;
                  })
                  .addCase(getMyPayment.fulfilled, (state, action) => {
                      state.loading = false;
                      if (action.payload.success) {
      
                        state.myPayments = action.payload.payments
                          toast.success(action.payload.message); // backend success
                      } else {
                          state.error = action.payload.message;
                          toast.error(action.payload.message); // backend error
                      }
                  })

  },
});


export default paymentSlice.reducer;
