import mongoose from "mongoose";

const doctorSpecializationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: ""
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Example: "Cardiology", "Dermatology", "Orthopedics"
const DoctorSpecialization = mongoose.model("specializations", doctorSpecializationSchema);

export default DoctorSpecialization;
