import userModel from "../models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from "../models/appointmentModel.js";
import prescriptionModel from "../models/prescriptions.js";



const generateToken = (id) => {
  return jwt.sign({ id }, process.env.jwt_secret, { expiresIn: '1d' })
}

export const register = async (req, res) => {
  const { name, password, email, role, specialization } = req.body;

  // Validate required fields for all users
  if (!name || !password || !email || !role) {
    return res.status(400).json({ message: 'name, password, email, and role are required' });
  }

  // If role is doctor, specialization must be provided
  if (role === 'doctor' && !specialization) {
    return res.status(400).json({ message: 'specialization is required for doctors' });
  }

  // Check if username already exists
  const userExist = await userModel.findOne({ name });
  if (userExist) {
    return res.status(409).json({ message: 'username already exists' });
  }

  // Hash the password
  const hashpass = await bcrypt.hash(password, 10);

  // Create user object
  const userData = { name, password: hashpass, email, role };
  // Add specialization only if the role is 'doctor'
  if (role === 'doctor') {
    userData.specialization = specialization;
  }

  const newUser = await userModel.create(userData);

  res.status(201).json({ message: 'created new user', user: newUser, token: generateToken(newUser._id) });
};


export const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ message: "username or password are required" })
  }


  const userExist = await userModel.findOne({ name }).populate("specialization", "name");
    if (!userExist) {
    return res.status(404).json({ success: false, message: "user not found" })
  }
 if (
  userExist.role === "doctor" &&
  (userExist.approved === "pending" || userExist.approved === "rejected")
) {
  return res.status(403).json({
    success: false,
    message: "Doctor role approval is pending or rejected. Please wait for admin's action."
  });
}


  const verifyed = await bcrypt.compare(password, userExist.password)
  if (!verifyed) {
    return res.status(401).json({ success: false, message: "password not match" })
  }

  // const token = jwt.sign({ userid: userExist._id, name }, process.env.secret)
  const token = generateToken(userExist._id)
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: false
  })
  res.status(200).json({ success: true,  message: "logged in successfully", user: {...userExist._doc, token}
  });
}
export const logout = async (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) })
  res.json("logged out")
}

export const editUserById = async (req, res) => {
  const { id } = req.params;
  const findAppointment = await userModel.findById(id);

  if (!findAppointment) {
    return res.status(404).json({ message: "Appointment not found" });
  }

  const updatedAppointment = await userModel.findByIdAndUpdate(id, req.body, { new: true });
  res.status(200).json({ message: "Appointment updated", updatedAppointment });
};


export const getUserById = async (req, res) => {

  const { id } = req.params
  try {
    const user = await userModel.findById(id)
    if (!user) {
      return res.json({ message: " user not found" })

    }
    res.json({ message: "userfound", user })
  } catch (error) {
    console.log(error.message);
  }

}
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await userModel
      .find({ role: "doctor" })
      .populate("specialization", "name"); // only bring specialization name

    if (!doctors || doctors.length === 0) {
      return res.json({ message: "No doctors found" });
    }

    res.json({
      message: "doctors",
      doctors,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};



export const getUserFullHistory = async (req, res) => {
  try {
    const { id } = req.params;

   
    const appointments = await appointmentModel
      .find({ patient_id: id })
      .populate("doctor_id", "name email specialization")
      .populate("specialization", "name")


    // 💊 Fetch all prescriptions of this patient
    const prescriptions = await prescriptionModel
      .find({ patient_id: id })
      .populate("doctor_id", "name email specialization")
      .populate("appointment_id", "status date description")
   

    // 📦 If both empty
    

    // ✅ Respond with both
    res.status(200).json({
      success: true,
      message: "User full medical history fetched successfully",
      data: {
        appointments,
        prescriptions
      }
    });
  } catch (error) {
    console.error("Error fetching full history:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};




export const getUsers = async (req, res) => {


  const users = await userModel.find({}).populate("specialization", "name")

  res.json({ message: "users", users })
} 