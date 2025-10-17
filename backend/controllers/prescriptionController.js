import prescriptionModel from "../models/prescriptions.js";

export const createPrescription = async (req, res) => {
  try {
    const { patient_id, doctor_id, appointment_id, medicines } = req.body;

    if (!patient_id || !doctor_id || !appointment_id || !medicines) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPrescription = {
      patient_id,
      doctor_id,
      appointment_id,
      medicines,
      date: Date.now()
    };

    const createpresc = await prescriptionModel.create(newPrescription);

    res.status(201).json({ message: "New prescription created", prescription : createpresc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllPrescriptions = async (req, res) => {
  const prescriptions = await prescriptionModel.find({}).populate("doctor_id", "name").populate("patient_id", "name")
  res.status(200).json({ message: "Prescriptions fetched successfully", prescriptions });
};


export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionModel
      .find({ patient_id: req.user._id }).populate("patient_id", "name") .populate("doctor_id" , "name")
    res.status(200).json({
      message: prescriptions.length > 0 ? "prescriptions fetched" : "No prescriptions found",
      prescriptions, // always an array
    });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ message: "Server error", prescriptions: [] });
  }
};
export const getDocPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionModel
      .find({ doctor_id: req.user._id }).populate("patient_id", "name") .populate("doctor_id" , "name")
    res.status(200).json({
      message: prescriptions.length > 0 ? "prescriptions fetched" : "No prescriptions found",
      prescriptions, // always an array
    });
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    res.status(500).json({ message: "Server error", prescriptions: [] });
  }
};
export const editPrescriptionById = async (req, res) => {
  const { id } = req.params;
  const findPrescription = await prescriptionModel.findById(id);

  if (!findPrescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }

  const updatedPrescription = await prescriptionModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ message: "Prescription updated", updatedPrescription });
};

export const deletePrescriptionById = async (req, res) => {
  const { id } = req.params;
  const findPrescription = await prescriptionModel.findById(id);

  if (!findPrescription) {
    return res.status(404).json({ message: "Prescription not found" });
  }

  await prescriptionModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Prescription deleted successfully" });
};
