import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice";
import { getAllSpcl } from "../../features/doctor/specializationSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);
  const { allSpcl } = useSelector((state) => state.specialization);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("patient");
  const [specialization, setSpecialization] = useState("");

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
      approved: role === "doctor" ? "pending" : "approved",
    };

    dispatch(registerUser(newUser));
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="shadow-2xl rounded-2xl bg-white w-full max-w-6xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none p-6 sm:p-8">
          <img
            src="/doc.png"
            alt="Doctor"
            className="relative max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] object-contain z-10 mb-4"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-white text-center">
            Welcome Back!
          </h1>
          <p className="text-white mt-2 text-sm sm:text-base text-center">
            Sign in to continue to your account
          </p>
        </div>

        {/* Right Section - Register Form */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 md:p-10 flex flex-col bg-gray-50 justify-center">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
            <h3 className="text-md sm:text-lg font-semibold text-gray-700">
              Brand Name
            </h3>
            <button
              onClick={() => navigate("/login")}
              className="bg-white w-full sm:w-[100px] shadow-md text-black font-semibold hover:bg-blue-600 py-2 sm:py-3 rounded-lg transition duration-200 text-sm"
              type="button"
            >
              Login
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
            Register
          </h2>

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <label className="text-gray-500 text-sm" htmlFor="name">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              type="email"
              id="email"
              placeholder="Enter your email"
            />

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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              type="password"
              id="confirm"
              placeholder="Re-enter your password"
            />

            <button
              disabled={loading}
              className="bg-blue-500 shadow-md text-white font-semibold hover:bg-blue-600 py-3 rounded-md transition duration-200 text-sm sm:text-base disabled:opacity-50 mt-2"
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
