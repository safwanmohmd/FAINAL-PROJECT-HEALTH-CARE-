import mongoose, { mongo } from "mongoose";

const paymentSchema = mongoose.Schema({
    appoinment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "appoinment",

    },
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    date: Date,
    status: {
        type: String,
        enum: ["success", "failed", "pending"],
        default: "pending"
    }
}) 

const paymentModel = mongoose.model('payment',paymentSchema)
export default paymentModel