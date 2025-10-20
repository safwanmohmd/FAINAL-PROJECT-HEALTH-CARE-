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
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="shadow-2xl rounded-2xl bg-white w-[70%] flex">
        {/* Left Section - Logo */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-blue-500 rounded-l-2xl p-8">
         <img
            src="../../../public/doc.png"
            alt="Doctor"
            className="relative max-w-[350px] md:max-w-[400px] object-contain z-10 mb-4"
          />
          <h1 className="text-3xl font-bold text-white">Welcome Back!</h1>
          <p className="text-white mt-2 text-center">
            Sign in to continue to your account
          </p>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-1/2 p-10 flex flex-col bg-gray-50 justify-center">
          <div className="flex justify-between">
            <h3>brand name</h3>
            <button
            onClick={()=> navigate("/register")}
              className="bg-white w-[100px] shadow-md text-black font-semibold hover:bg-blue-600 py-3 rounded-lg transition duration-200"
              type="submit"
            >
              Register
            </button>
          </div>

          <h2 className="text-3xl font-bold  text-gray-700 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-gray-400" htmlFor="">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Username"
            />
            <label className="text-gray-400" htmlFor="">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Password"
            />
            <button
              className="bg-blue-500 shadow-md text-white font-semibold hover:bg-blue-600 py-3 rounded-lg transition duration-200"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="mt-6 flex justify-between text-sm text-gray-500">
            <a href="/register" className="hover:text-blue-600 transition">
              Create Account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
