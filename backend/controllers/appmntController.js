import appointmentModel from "../models/appointmentModel.js";

export const createAppointment = async (req, res) => {
  const { patient_id, doctor_id, status, date, specialization, description } = req.body;
  if (!patient_id || !doctor_id || !status) {
    return res.status(400).json({ message: "patient_id, doctor_id, and status are required" });
  }

  const newAppointment = await appointmentModel.create({
    patient_id,
    doctor_id,
    status,
    date,
    specialization,
    description,  // ✅ use provided date
  });

  res.status(201).json({ message: "New appointment created", newAppointment });
};

export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
      .populate("doctor_id", "name")        // get doctor name
      .populate("patient_id", "name")       // get patient name
      .populate("specialization", "name") // get specialization name

    res.status(200).json({
      message: "Appointments fetched successfully",
      appointments,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching appointments", error });
  }
};


export const getMyAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ patient_id: req.user._id }).populate("patient_id", "name") .populate("doctor_id" , "name").populate("specialization", "name")
    res.status(200).json({
      message: appointments.length > 0 ? "Appointments fetched" : "No appointments found",
      appointments, // always an array
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error", appointments: [] });
  }
};
export const getDocAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel
      .find({ doctor_id: req.user._id }).populate("patient_id", "name") .populate("doctor_id" , "name").populate("specialization", "name")
    res.status(200).json({
      message: appointments.length > 0 ? "Appointments fetched" : "No appointments found",
      appointments, // always an array
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Server error", appointments: [] });
  }
};

export const editAppointmentById = async (req, res) => {
  const { id } = req.params;
  const findAppointment = await appointmentModel.findById(id);

  if (!findAppointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  const updatedAppointment = await appointmentModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ message: "Appointment updated", updatedAppointment });
};

export const deleteAppointmentById = async (req, res) => {
  const { id } = req.params;
  const findAppointment = await appointmentModel.findById(id);

  if (!findAppointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  await appointmentModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Appointment deleted successfully" });
};
