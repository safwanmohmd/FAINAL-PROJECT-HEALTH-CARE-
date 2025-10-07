import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export const isLogged = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure .env uses JWT_SECRET

    if (!decoded) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = await userModel.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    return res.status(403).json({ message: error.message });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Not an admin" });
  }
};

export const isDoctor = (req, res, next) => {
  if (req.user && req.user.role === "doctor" || req.user.role == "admin") {
    next();
  } else {
    return res.status(403).json({ error: "Not a doctor" });
  }
};
