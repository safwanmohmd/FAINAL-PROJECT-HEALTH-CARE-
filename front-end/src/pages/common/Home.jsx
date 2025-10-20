import React from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../../componants/common/ChatBot";
const App = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogin = () => {
    if (user) {
      localStorage.removeItem("user");
      navigate("/")
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="font-sans h-screen flex flex-col items-center justify-center bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between h-full px-4 sm:px-6 py-12 md:py-20">
        
        {/* Left side: Text content and buttons */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight mb-4">
            Your Health <br /> Is Our Priority
          </h1>
          <p className="text-base sm:text-lg md:text-lg text-gray-600 mb-8 max-w-md md:max-w-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
            pharetra, lobortis pretium cras sem. Eu, adipiscing et morbi egestas
            semper ornare sagittis. Molestie ridiculus elit sagittis, mol
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <button
              onClick={() => navigate("/bookappointment")}
              className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-teal-600 transition-colors"
            >
              Make An Appointment
            </button>
            {user && (user.role === "patient" ? (
              <button
                onClick={() => navigate("/patient/dashboard")}
                className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                Patient Dashboard
              </button>
            ) : user.role === "admin" ? (
              <>
                <button
                  onClick={() => navigate("/admin/dashboard")}
                  className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                >
                  Admin Dashboard
                </button>
                <button
                  onClick={() => navigate("/doctor/dashboard")}
                  className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                >
                  Doctors Dashboard
                </button>
                <button
                  onClick={() => navigate("/patient/dashboard")}
                  className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
                >
                  Patient Dashboard
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate("/doctor/dashboard")}
                className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
              >
                Doctors Dashboard
              </button>
            ))}
            <button
              onClick={handleLogin}
              className="bg-transparent text-teal-500 font-semibold py-3 px-6 rounded-full border border-teal-500 hover:bg-teal-50 hover:text-teal-600 transition-colors"
            >
              {user ? "Logout" : "Login"}
            </button>
          </div>
        </div>

        {/* Right side: Doctor image with the circular background */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative mt-10 md:mt-0">
          {/* Circle background */}
         

          {/* Doctor image */}
          <div className="flex items-center justify-center h-[250px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[700px] lg:h-[700px] overflow-hidden">
            <img
              className="absolute w-auto h-[60%] object-cover bottom-10 sm:bottom-16 md:bottom-40 transform scale-100 sm:scale-110 md:scale-125"
              src="/doc.png"
              alt="Doctor"
            />
          </div>
        </div>
        <ChatBot/>
      </div>
    </div>
  );
};

export default App;
