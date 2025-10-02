import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import spclReducer from "../features/doctor/specializationSlice"
import appmntReducer from "../features/doctor/appointmentSlice"
import prescriptionReducer from "../features/doctor/prescriptionSlice"
import bookReducer from "../features/cloudinary/bookModel"
const store = configureStore({
    reducer: {
        auth:authReducer,
        specialization:spclReducer,
        appointment: appmntReducer,
        prescription: prescriptionReducer,
        books : bookReducer
    }
})

export default store