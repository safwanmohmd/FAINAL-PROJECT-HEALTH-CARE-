import mongoose, { mongo, Schema } from "mongoose";

const appmntSchema = mongoose.Schema({
    patient_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    specialization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "specializations",
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled", "completed", "rescheduled"],
        default: "pending",

    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

const appointmentModel = mongoose.model('appointment',appmntSchema)

export default appointmentModel