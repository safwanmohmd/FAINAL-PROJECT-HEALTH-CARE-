import {configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import spclReducer from "../features/doctor/specializationSlice"
import appmntReducer from "../features/doctor/appointmentSlice"
const store = configureStore({
    reducer: {
        auth:authReducer,
        specialization:spclReducer,
        appointment: appmntReducer
    }
})

export default store