import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("patient");
  const [active, setActive] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setRole(storedUser?.role || "patient");

      if (window.location.pathname === "/doctor/dashboard") {
    setActive("doctor-dashboard");
  } else if (window.location.pathname === "/doctor/appointments") {
    setActive("doctor-appointments");
  } else if (window.location.pathname === "/doctor/prescriptions") {
    setActive("doctor-prescriptions");
  } else if (window.location.pathname === "/patient/dashboard") {
    setActive("patient-dashboard");
  } else if (window.location.pathname === "/patient/appointments") {
    setActive("patient-appointments");
  } else if (window.location.pathname === "/patient/prescriptions") {
   setActive("patient-prescriptions");
  } else if (window.location.pathname === "/patient/payments") {
   setActive("patient-payments");
  } else if (window.location.pathname === "/admin/ucp") {
   setActive("admin-ucp");
  } else if (window.location.pathname === "/admin/appointment") {
   setActive("admin-appointment");
  } else if (window.location.pathname === "/admin/prescriptions") {
   setActive("admin-prescriptions");
  }
   else if (window.location.pathname === "/admin/specialization") {
    setActive("admin-specialization");
  }   else setActive("");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isAdmin = role === "admin";
  const isDoctor = role === "doctor";
  const isPatient = role === "patient";

  const activeClass = "bg-blue-500 text-white hover:bg-blue-600";
  const defaultClass = "hover:bg-gray-100 text-gray-600";

  return (
    <div className="w-52 h-screen bg-white shadow-md p-3 flex flex-col text-sm">
      <h2 className="mt-3 mb-4 text-xl font-bold text-center">
        <i className="bi bi-heart-pulse"></i>{" "}
        <button onClick={()=> navigate("/")} className="cursor-pointer">
           <span className="text-blue-700">Health</span>
        <span className="text-green-500">Care</span>
        </button>
       
      </h2>

      {/* Doctor Section */}
      {(isAdmin || isDoctor) && (
        <div className="mb-3">
          <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">Doctor</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => navigate("/doctor/dashboard")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "doctor-dashboard" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-speedometer2 text-base"></i> Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/doctor/appointments")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "doctor-appointments" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-calendar-check text-base"></i> Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/doctor/prescriptions")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "doctor-prescriptions" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-prescription"></i> Prescriptions
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Patient Section */}
      {(isAdmin || isPatient) && (
        <div className="mb-3">
          <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">Patient</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => navigate("/patient/dashboard")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "patient-dashboard" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-speedometer2 text-base"></i> Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/patient/appointments")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "patient-appointments" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-calendar-check text-base"></i> Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/patient/prescriptions")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "patient-prescriptions" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-prescription"></i> Prescriptions
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/patient/payments")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "patient-payments" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-file-medical text-base"></i> Payment History
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Admin Section */}
      {isAdmin && (
        <div className="mb-3">
          <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">Admin</h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => navigate("/admin/ucp")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "admin-ucp" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-people text-base"></i> User Management
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/appointment")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "admin-appointment" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-calendar2-check text-base"></i> Appointments
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/prescriptions")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "admin-prescriptions" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-prescription"></i> All Prescriptions
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/admin/specialization")}
                className={`flex items-center gap-2 w-full px-2 py-1 rounded-lg transition text-sm ${
                  active === "admin-specialization" ? activeClass : defaultClass
                }`}
              >
                <i className="bi bi-magic"></i> All Specialization
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* General Section */}
      <div>
        <h3 className="px-2 mb-1 text-gray-400 uppercase text-[10px] font-semibold">General</h3>
        <ul className="space-y-1">
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-2 py-1 rounded-lg text-gray-600 hover:bg-gray-100 transition text-sm"
            >
              <i className="bi bi-box-arrow-right text-base"></i> Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
