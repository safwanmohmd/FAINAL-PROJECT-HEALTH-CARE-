import React from "react";
import Navbar from "../../componants/common/Navbar";
// A simple Navbar component

import { useNavigate } from "react-router-dom";
// The main Home component
const App = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogin = () => {
    if (user) {
      localStorage.removeItem("user");
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="font-sans min-h-screen flex flex-col items-center justify-center bg-white">
      <Navbar />
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full px-6 py-20 md:py-0">
        {/* Left side: Text content and buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 leading-tight mb-4">
            Your Health <br /> Is Our Priority
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            pharetra, lobortis pretium cras sem. Eu, adipiscing et morbi egestas
            semper ornare sagittis. Molestie ridiculus elit sagittis, mol
          </p>
          <div className="flex space-x-4">
            <button className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-teal-600 transition-colors">
              Make An Appointment
            </button>
            {user && (user.role == "patient" ? (
              <button className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                Patient Dashboard
              </button>
            ) : user.role == "admin" ? (
              <> <button onClick={()=> navigate("/dashboard")} className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                Admin Dashboard
              </button>
               <button onClick={()=>navigate("/patient")} className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                Doctors Dashboard
              </button></>
             
            ) : (
              <button onClick={()=>navigate("/patient")} className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors">
                Doctors Dashboard
              </button>
            ))}

            <button
              onClick={handleLogin}
              className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
            >
              {user ? "Logout" : "login"}
            </button>
          </div>
        </div>

        {/* Right side: Doctor image with the circular background */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          {/* Circle background */}
          <div className="absolute right-1/2 transform translate-x-1/2 top-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-teal-500 rounded-full hidden md:block"></div>

          {/* Doctor image */}
          <div className="relative z-10 flex items-center justify-center w-[400px] h-[400px] md:w-[700px] md:h-[700px] overflow-hidden">
            <img
              className="absolute w-auto h-[60%] object-cover bottom-40 transform scale-125"
              src="../../media/doc.png"
              alt="Doctor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
