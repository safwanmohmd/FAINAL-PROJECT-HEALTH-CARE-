import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="w-80 bg-white h-screen shadow-md p-4 flex flex-col">
      <h2 className="mt-4 mb-4 text-2xl font-bold text-center">
        <i className="bi bi-heart-pulse"></i>{" "}
        <span className="text-blue-700">Health</span>
        <span className="text-green-500">Care</span>
      </h2>
      <ul className="mt-3.5 space-y-2">
        {/* Active Item */}
        <li>
          <button
        onClick={() => {
  setActiveItem("overview");
  navigate("/dashboard");
}}
            className={`flex items-center ${
              activeItem === "overview"
                ? "bg-blue-500  text-white"
                : "hover:bg-gray-100 text-gray-600"
            } gap-3 w-full px-3 py-2 rounded-lg transition`}
          >
            <i className="bi bi-grid-fill text-lg"></i>
            <span>Overview</span>
          </button>
        </li>

        {/* Inactive Items */}
        <li>
          <button
            onClick={() => {setActiveItem("appointment")
              navigate("/appointments")
            }}
            className={`flex items-center ${
              activeItem === "appointment"
                ? "bg-blue-500  text-white"
                : "hover:bg-gray-100 text-gray-600"
            } gap-3 w-full px-3 py-2 rounded-lg transition`}
          >
            <i className="bi bi-file-earmark-text text-lg"></i>
            <span>Appointments</span>
          </button>
        </li>

        <li>
          <button
            onClick={() => setActiveItem("UserManagement")}
            className={`flex items-center ${
              activeItem === "UserManagement"
                ? "bg-blue-500  text-white"
                : "hover:bg-gray-100 text-gray-600"
            } gap-3 w-full px-3 py-2 rounded-lg transition`}
          >
            <i className="bi bi-calendar-event text-lg"></i>
            <span>User Management</span>
          </button>
        </li>

        <li>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            <i className="bi bi-chat-left-text text-lg"></i>
            <span>Message</span>
          </button>
        </li>

        <li>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            <i className="bi bi-bar-chart text-lg"></i>
            <span>Reports</span>
          </button>
        </li>

        <li>
          <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition">
            <i className="bi bi-gear text-lg"></i>
            <span>Settings</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
