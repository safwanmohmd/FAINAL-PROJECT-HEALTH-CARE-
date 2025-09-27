import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors, registerUser } from "../features/auth/authSlice";

const BookAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error } = useSelector((state) => state.auth);
  const { allDoctors } = useSelector((state) => state.auth);

  // Local form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Here used for patient notes
  const [role] = useState("patient");
  const [specialization, setSpecialization] = useState("");

  // Fetch all doctors on mount
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      role,
      specialization: role === "doctor" ? specialization : null,
      password, // used for patient notes
    };
    dispatch(registerUser(newUser));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="shadow-2xl rounded-2xl bg-white w-[80%] max-w-7xl flex overflow-hidden">
        {/* Left Section: Gradient + Hero */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 p-6 relative">
          {/* Circle background like App.jsx */}
          <div className="absolute w-[400px] h-[400px] bg-teal-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30 hidden md:block"></div>

          <img
            src="../../media/doc.png"
            alt="Doctor"
            className="relative max-w-[350px] md:max-w-[400px] object-contain z-10 mb-4"
          />
          <h1 className="text-2xl font-bold text-white z-10">Welcome Back!</h1>
          <p className="text-white mt-2 text-sm text-center z-10">
            What do you want from this consult? (diagnosis, prescription,
            referral, second opinion, sick note)
          </p>
        </div>

        {/* Right Section: Form */}
        <div className="w-1/2 p-8 flex flex-col bg-gray-50 justify-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Book An Appointment
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Name */}
            <label className="text-gray-500 text-sm" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              type="text"
              id="name"
              placeholder="Enter your name"
            />

            {/* Email */}
            <label className="text-gray-500 text-sm" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              type="email"
              id="email"
              placeholder="Enter your email"
            />

            {/* Choose Doctor */}
            <label className="text-gray-500 text-sm" htmlFor="doc">
              Choose Your Doctor
            </label>
            <select
              id="doc"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
              <option value="">Choose Your Doctor</option>
              {allDoctors?.map((x) => (
                <option key={x._id} value={x._id}>
                  {x.name} ({x.specialization?.name})
                </option>
              ))}
            </select>

            {/* Health Concern Notes */}
            <label className="text-gray-500 text-sm" htmlFor="notes">
              Describe Your Health Concern
            </label>
            <textarea
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              id="notes"
              rows={6}
              placeholder="Explain your condition for the doctor (e.g., pain, duration, medications used)..."
            />

            {/* Submit Button */}
            <button
              disabled={loading}
              className="bg-blue-500 shadow-md text-white font-semibold hover:bg-blue-600 py-2 rounded-md transition duration-200 text-sm disabled:opacity-50"
              type="submit"
            >
              {loading ? "Please wait..." : "Submit Form"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
