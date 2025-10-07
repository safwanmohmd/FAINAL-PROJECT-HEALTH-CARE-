import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {

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

  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  return (
    <div className="w-72 bg-white h-screen shadow-md p-3 flex flex-col text-sm">
      <h2 className="mt-3 mb-4 text-xl font-bold text-center">
        <i className="bi bi-heart-pulse"></i>{" "}
        <span className="text-blue-700">Health</span>
        <span className="text-green-500">Care</span>
      </h2>

      {/* Doctor Section */}
      {(isAdmin || isDoctor) && (
        <div className="mb-3">
          <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">
            Doctor
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => {
                
                  navigate("/doctor/dashboard");
                }}
                className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm bg-blue-500 text-white"       >
                <i className="bi bi-speedometer2 text-base"></i>
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                
                  navigate("/doctor/appointments");
                }}
                className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-calendar-check text-base"></i>
                Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                
                  navigate("/doctor/prescriptions");
                }}
              className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
              
                <i className="bi bi-file-medical text-base"></i>
                Prescriptions
              </button>
            </li>
           
          </ul>
        </div>
      )}
      {(isAdmin || isPatient) && (
        <div className="mb-3">
          <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">
            Patient
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => {
               
                  navigate("/patient/dashboard");
                }}
               className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-speedometer2 text-base"></i>
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                 
                  navigate("/patient/appointments");
                }}
               className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-calendar-check text-base"></i>
                Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                 
                  navigate("/patient/prescriptions");
                }}
               className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-file-medical text-base"></i>
                Prescriptions
              </button>
            </li>
          
          </ul>
        </div>
      )}

      {/* Admin Section */}
      {isAdmin && (
        <div className="mb-3">
          <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">
            Admin
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => {
                
                  navigate("/admin/ucp");
                }}
               className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-people text-base"></i>
                User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => {
               
                  navigate("/admin/appointment");
                }}
              className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-calendar2-check text-base"></i>
                Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => {

                  navigate("/admin/prescriptions");
                }}
            className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-journal-medical text-base"></i>
                All Prescriptions
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                
                  navigate("/admin/specialization");
                }}
              className="flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm hover:bg-gray-100 text-gray-600 " >
                <i className="bi bi-journal-medical text-base"></i>
                All Specialization
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* General Section */}
      <div className="mt-auto">
        <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">
          General
        </h3>
        <ul className="space-y-1">
          <li>
            <button className="flex items-center gap-2 w-full px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100 transition text-sm">
              <i className="bi bi-gear text-base"></i>
              Settings
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100 transition text-sm"
            >
              <i className="bi bi-box-arrow-right text-base"></i>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
