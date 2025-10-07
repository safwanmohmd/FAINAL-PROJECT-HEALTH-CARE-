import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";

// Create prescription
export const createPrescription = createAsyncThunk(
  "prescription/create",
  async (data, { rejectWithValue }) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axiosInstance.post("/prescriptions", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return { success: true, ...response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Get all prescriptions
export const getAllPrescriptions = createAsyncThunk(
  "prescription/getAll",
  async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axiosInstance.get("/prescriptions", {
        headers: { Authorization: `Bearer ${token}` },
      });

    return { success: true, prescriptions: response.data.prescriptions };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);
// Get all prescriptions
export const getMyPrescriptions = createAsyncThunk(
  "prescription/getMy",
  async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axiosInstance.get("/prescriptions/getmy", {
        headers: { Authorization: `Bearer ${token}` },
      });

    return { success: true, ...response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);


export const getDocPrescriptions = createAsyncThunk(
  "prescription/getDoc",
  async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axiosInstance.get("/prescriptions/getdoc", {
        headers: { Authorization: `Bearer ${token}` },
      });

    return { success: true, ...response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);



export const deletePrescription = createAsyncThunk(
  "prescription/delete",
  async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      const response = await axiosInstance.delete(`/prescriptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, message: response.data.message };

    } catch (error) {
      return { success: false, message: error.response?.data?.message || error.message };
    }
  }
);

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
    allPresc: [],
    loading: false,
    error: null,
    myPresc : [],
    docPresc :[]
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPrescription.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.user = action.payload.user;
          toast.success(action.payload.message); // backend success
        } else {
          state.error = action.payload.message;
          toast.error(action.payload.message); // backend error
        }
      })
      .addCase(createPrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to create prescription");
      })
      .addCase(getAllPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.allPresc = action.payload.prescriptions;
      })
      .addCase(getAllPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Failed to fetch prescriptions");
      })


      .addCase(deletePrescription.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePrescription.fulfilled, (state, action) => {
        state.loading = false;
       toast.success(action.payload.message)
      })
      .addCase(deletePrescription.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })


      .addCase(getMyPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.myPresc = action.payload.prescriptions
       toast.success(action.payload.message)
      })
      .addCase(getMyPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      })



      .addCase(getDocPrescriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocPrescriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.docPresc = action.payload.prescriptions
       toast.success(action.payload.message)
      })
      .addCase(getDocPrescriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload.message);
      });
  },
});

export default prescriptionSlice.reducer;
