import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(password);
      const user = {
        name,
        password,
      };
      dispatch(loginUser(user));
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200 p-4">
      <div className="shadow-2xl rounded-2xl bg-white w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section - Logo */}
        <div className="md:w-1/2 w-full flex flex-col justify-center items-center bg-blue-500 md:rounded-l-2xl rounded-t-2xl md:rounded-tr-none p-6 sm:p-8">
          <img
            src="/doc.png"
            alt="Doctor"
            className="relative max-w-[250px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] object-contain z-10 mb-4"
          />
          <h1 className="text-2xl sm:text-3xl font-bold text-white text-center">Welcome Back!</h1>
          <p className="text-white mt-2 text-center text-sm sm:text-base">
            Sign in to continue to your account
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="md:w-1/2 w-full p-6 sm:p-8 md:p-10 flex flex-col bg-gray-50 justify-center">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h3 className="text-xl sm:text-2xl">
              <span className="text-blue-700">Health</span>
              <span className="text-green-500">Care</span>
            </h3>
            <button
              onClick={() => navigate("/register")}
              className="bg-white w-full sm:w-[100px] shadow-md text-black font-semibold hover:bg-blue-600 py-2 sm:py-3 rounded-lg transition duration-200"
              type="submit"
            >
              Register
            </button>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-6 mt-4 sm:mt-6">Login</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
            <label className="text-gray-400 text-sm sm:text-base" htmlFor="">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              type="text"
              placeholder="Username"
            />

            <label className="text-gray-400 text-sm sm:text-base" htmlFor="">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
              type="password"
              placeholder="Password"
            />

            <button
              className="bg-blue-500 shadow-md text-white font-semibold hover:bg-blue-600 py-3 rounded-lg transition duration-200 mt-2"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 flex justify-between text-sm text-gray-500">
            <a href="/register" className="hover:text-blue-600 transition w-full text-center md:w-auto">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
