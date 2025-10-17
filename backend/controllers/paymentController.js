import paymentModel from "../models/paymentModel.js";

export const createPayment = async (req, res) => {
  const { patient_id, doctor_id, status} = req.body;

  if (!patient_id || !doctor_id || !status) {
    return res.status(400).json({ message: "patient_id, doctor_id, and status are required" });
  }

  const newPayment = await paymentModel.create({
   
    patient_id,
    doctor_id,
    status,  // ✅ use provided date if available
  });

  res.status(201).json({ message: "New payment created", newPayment });
};

export const getAllPayments = async (req, res) => {
  const payments = await paymentModel.find({}).populate("doctor_id", "name").populate("patient_id","name");
  res.status(200).json({ message: "Payments fetched successfully", payments });
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await paymentModel.find({ patient_id: req.user.id}).populate("doctor_id","name").populate("patient_id","name");
    res.status(200).json({
      message: payments.length > 0 ? "Payments fetched" : "No payments found",
      payments, // always an array
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ message: "Server error", payments: [] });
  }
};

export const editPaymentById = async (req, res) => {
  const { id } = req.params;

  const findPayment = await paymentModel.findById(id);

  if (!findPayment) {
    return res.status(404).json({ message: "findPayment not found" });
  }

  const updatedPayment = await paymentModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ message: "payment updated", updatedPayment });
};
