import specializationModel from "../models/specialization.js";

export const createSpecialization = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "description, name are required" });
  }

  const newSpecialization = await specializationModel.create({
    name,
    description 
  });

  res.status(201).json({ message: "New specialization created", newSpecialization });
};

export const getAllSpecializations = async (req, res) => {
  const specializations = await specializationModel.find({});
  res.status(200).json({ message: "Specializations fetched successfully", specializations });
};

export const getMySpecializations = async (req, res) => {
  try {
    const specializations = await specializationModel.find({ user: req.user.id || req.user.userid });
    res.status(200).json({
      message: specializations.length > 0 ? "Specializations fetched" : "No specializations found",
      specializations, // always an array
    });
  } catch (error) {
    console.error("Error fetching specializations:", error);
    res.status(500).json({ message: "Server error", specializations: [] });
  }
};

export const editSpecializationById = async (req, res) => {
  const { id } = req.params;
  const findSpecialization = await specializationModel.findById(id);

  if (!findSpecialization) {
    return res.status(404).json({ message: "Specialization not found" });
  }

  const updatedSpecialization = await specializationModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ message: "Specialization updated", updatedSpecialization });
};

export const getSpclById = async (req, res) => {

  const { id } = req.params
  try {
      const spcl = await specializationModel.findById(id)
  if (!user) {
    return res.json({ message: " spcialization not found" })

  }
  res.json({ message: "spcialization found", spcl })
  } catch (error) {
    console.log(error.message);
  }

} 

export const deleteSpecializationById = async (req, res) => {
  const { id } = req.params;
  const findSpecialization = await specializationModel.findById(id);

  if (!findSpecialization) {
    return res.status(404).json({ message: "Specialization not found" });
  }

  await specializationModel.findByIdAndDelete(id);
  res.status(200).json({ message: "Specialization deleted successfully" });
};
