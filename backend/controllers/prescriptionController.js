import prescriptionModel from "../models/prescriptions.js";


export const createPrescription = async (req, res) => {
  const { patient_id, doctor_id, appointment_id, medicines, amount, date } = req.body;

  if (!patient_id || !doctor_id || !medicines) {
    return res.status(400).json({ message: "patient_id, doctor_id, and medicines are required" });
  }

  const newPrescription = await prescriptionModel.create({
    patient_id,
    doctor_id,
    appointment_id,
    medicines,
    amount,
    date // ✅ use provided date if available
  });

  res.status(201).json({ message: "New prescription created", newPrescription });
};

export const getAllPrescriptions = async (req, res) => {
  const prescriptions = await prescriptionModel.find({});
  res.status(200).json({ message: "Prescriptions fetched successfully", prescriptions });
};

export const getMyPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescriptionModel.find({ user: req.user.id || req.user.userid });
    res.status(200).json({
      message: prescriptions.length > 0 ? "Prescriptions fetched" : "No prescriptions found",
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
