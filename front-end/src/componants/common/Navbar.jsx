import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [role, setRole] = useState("patient");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || "patient");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  return (
    <nav className="bg-white border-b border-gray-200 shadow-md relative z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <h2 className="mt-3 mb-4 text-xl font-bold text-center">
          <i className="bi bi-heart-pulse"></i>{" "}
          <button className="pointer">
              <span className="text-blue-700">Health</span>
          <span className="text-green-500">Care</span>
          </button>
        
        </h2>

        {/* Hamburger Button */}
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:items-center md:space-x-6">
          <ul className="flex space-x-4 font-medium">
            {/* Doctor Section */}
            {(isAdmin || isDoctor) && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/doctor/dashboard")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Doctor Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/doctor/appointments")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Appointments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/doctor/prescriptions")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Prescriptions
                  </button>
                </li>
              </>
            )}

            {/* Patient Section */}
            {(isAdmin || isPatient) && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/patient/dashboard")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Patient Overview
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/patient/appointments")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Appointments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/patient/prescriptions")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Prescriptions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/patient/payments")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Payment History
                  </button>
                </li>
              </>
            )}

            {/* Admin Section */}
            {isAdmin && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/admin/ucp")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    User Management
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/admin/appointment")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    Appointments
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/admin/prescriptions")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    All Prescriptions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/admin/specialization")}
                    className="text-gray-900 hover:text-blue-700"
                  >
                    All Specialization
                  </button>
                </li>
              </>
            )}

            {/* General Section */}
            <li>
              <button
                onClick={handleLogout}
                className="text-gray-900 hover:text-blue-700"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-md transition-all duration-300 overflow-hidden z-50 ${
          dropdownOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-1 p-4">
          {/* Doctor Section */}
          {(isAdmin || isDoctor) && (
            <>
              <li>
                <button
                  onClick={() => navigate("/doctor/dashboard")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Doctor Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/doctor/appointments")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/doctor/prescriptions")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Prescriptions
                </button>
              </li>
            </>
          )}

          {/* Patient Section */}
          {(isAdmin || isPatient) && (
            <>
              <li>
                <button
                  onClick={() => navigate("/patient/dashboard")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Patient Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/patient/appointments")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/patient/prescriptions")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Prescriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/patient/payments")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Payment History
                </button>
              </li>
            </>
          )}

          {/* Admin Section */}
          {isAdmin && (
            <>
              <li>
                <button
                  onClick={() => navigate("/admin/ucp")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  User Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/admin/appointment")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  Appointments
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/admin/prescriptions")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  All Prescriptions
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/admin/specialization")}
                  className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
                >
                  All Specialization
                </button>
              </li>
            </>
          )}

          {/* General Section */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 px-3 hover:bg-gray-100 rounded"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
