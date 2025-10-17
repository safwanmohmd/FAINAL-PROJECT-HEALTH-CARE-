import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { getAllSpcl } from "../../features/doctor/specializationSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error, user } = useSelector((state) => state.auth);
  const { allSpcl } = useSelector((state) => state.specialization);

  // Local form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");

  // Fetch all specializations when component mounts
  useEffect(() => {
    dispatch(getAllSpcl());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      return alert("Passwords do not match!");
    }

    const newUser = {
      name,
      email,
      password,
      role,
      specialization: role === "doctor" ? specialization : null,
      approved : role === "doctor" ? "pending" : "approved"
    };

    dispatch(registerUser(newUser));
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="shadow-2xl rounded-2xl bg-white w-[70%] max-w-7xl flex">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 rounded-l-2xl p-6">
        <img
            src="../../media/doc.png"
            alt="Doctor"
            className="relative max-w-[350px] md:max-w-[400px] object-contain z-10 mb-4"
          />
          <h1 className="text-2xl font-bold text-white">Welcome Back!</h1>
          <p className="text-white mt-2 text-sm text-center">
            Sign in to continue to your account
          </p>
        </div>

        {/* Right Section - Register Form */}
        <div className="w-1/2 p-8 flex flex-col bg-gray-50 justify-center">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-md font-semibold text-gray-700">Brand Name</h3>
          </div>

          <h2 className="text-2xl font-bold text-gray-700 mb-4">Register</h2>

          {/* Role Switch */}
          <div className="flex mb-6 bg-gray-200 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setRole("doctor")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                role === "doctor"
                  ? "bg-white text-blue-600 shadow"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Doctor
            </button>
            <button
              type="button"
              onClick={() => setRole("patient")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition ${
                role === "patient"
                  ? "bg-white text-blue-600 shadow"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Patient
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

            {/* Specialization only if role = doctor */}
            {role === "doctor" && (
              <>
                <label
                  className="text-gray-500 text-sm"
                  htmlFor="specialization"
                >
                  Specialization
                </label>
                <select
                  id="specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                >
                  <option value="">Select specialization</option>
                  {allSpcl.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.name}
                    </option>
                  ))}
                </select>
              </>
            )}

            <label className="text-gray-500 text-sm" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              type="password"
              id="password"
              placeholder="Enter your password"
            />

            <label className="text-gray-500 text-sm" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              type="password"
              id="confirm"
              placeholder="Re-enter your password"
            />

            <button
              disabled={loading}
              className="bg-blue-500 shadow-md text-white font-semibold hover:bg-blue-600 py-2 rounded-md transition duration-200 text-sm disabled:opacity-50"
              type="submit"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
