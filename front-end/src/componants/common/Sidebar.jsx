import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState();
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || "patient"); // default patient
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // role-based helpers
  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  return (
    <div className="w-80 bg-white h-screen shadow-md p-4 flex flex-col">
      <h2 className="mt-4 mb-4 text-2xl font-bold text-center">
        <i className="bi bi-heart-pulse"></i>{" "}
        <span className="text-blue-700">Health</span>
        <span className="text-green-500">Care</span>
      </h2>

      <ul className="mt-3.5 space-y-2">
        {/* Dashboard / Overview → only Admin & Doctor */}
        {(isAdmin || isDoctor) && (
          <li>
            <button
              onClick={() => {
                setActiveItem("overview");
                navigate("/dashboard");
              }}
              className={`flex items-center ${
                activeItem === "overview"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              } gap-3 w-full px-3 py-2 rounded-lg transition`}
            >
              <i className="bi bi-grid-fill text-lg"></i>
              <span>Overview</span>
            </button>
          </li>
        )}

        {/* Appointments → for Admin & Doctor only */}
        {(isAdmin || isDoctor) && (
          <li>
            <button
              onClick={() => {
                setActiveItem("appointment");
                navigate("/appointments");
              }}
              className={`flex items-center ${
                activeItem === "appointment"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              } gap-3 w-full px-3 py-2 rounded-lg transition`}
            >
              <i className="bi bi-file-earmark-text text-lg"></i>
              <span>Appointments</span>
            </button>
          </li>
        )}

        {/* User Management → only Admin */}
        {isAdmin && (
          <li>
            <button
              onClick={() => {
                setActiveItem("UserManagement");
                navigate("/ucp");
              }}
              className={`flex items-center ${
                activeItem === "UserManagement"
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100 text-gray-600"
              } gap-3 w-full px-3 py-2 rounded-lg transition`}
            >
              <i className="bi bi-people-fill text-lg"></i>
              <span>User Management</span>
            </button>
          </li>
        )}

        {/* Reports → only Admin & Doctor */}
        {(isAdmin || isDoctor) && (
          <li>
            <button
              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            >
              <i className="bi bi-bar-chart text-lg"></i>
              <span>Reports</span>
            </button>
          </li>
        )}

        {/* Settings → everyone */}
        <li>
          <button
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <i className="bi bi-gear text-lg"></i>
            <span>Settings</span>
          </button>
        </li>

        {/* Logout → everyone */}
        <li>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          >
            <i className="bi bi-box-arrow-right text-lg"></i>
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
