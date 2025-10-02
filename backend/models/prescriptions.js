import mongoose from "mongoose";

const prescriptionSchema = mongoose.Schema({
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "appointment",
    required: true
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  medicines: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const prescriptionModel = mongoose.model("prescriptions", prescriptionSchema);
export default prescriptionModel;
