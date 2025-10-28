import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllAppmnt } from "../../features/doctor/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Appointments from "./Appointments";
import { getAllDoctors } from "../../features/auth/authSlice";

const DoctorHome = () => {
  const { allAppmnt } = useSelector((state) => state.appointment);
  const { allDoctors } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppmnt());
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Hero Section */}
      <div className="bg-gradient-to-b from-blue-700 to-sky-600 relative rounded-xl overflow-hidden shadow-md mt-4 mx-4 sm:mx-6 md:mx-8 flex flex-col md:flex-row items-center justify-between p-6 md:p-8">
        {/* Left text */}
        <div className="text-center md:text-left max-w-lg z-10">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            Find the best doctors with Health Care
          </h1>
          <p className="text-white text-sm sm:text-base">
            Appoint the doctors and get finest medical services.
          </p>
        </div>

        {/* Right illustration */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-4 md:mt-0">
          <img
            src="/doc.png"
            alt="Doctor"
            className="h-[180px] sm:h-[220px] md:h-[250px] lg:h-[280px] object-contain"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4 sm:p-6 md:p-8">
        {/* Total Doctors */}
        <div className="bg-white rounded-2xl h-[140px] sm:h-[150px] shadow-md p-5 flex flex-col justify-between">
          <p className="text-gray-500 text-base sm:text-lg font-medium">
            Total Doctors
          </p>
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">
            {allDoctors ? allDoctors.length : "0"}
          </h1>
        </div>

        {/* Total Appointments */}
        <div className="bg-white rounded-2xl h-[140px] sm:h-[150px] shadow-md p-5 flex flex-col justify-between">
          <p className="text-gray-500 text-base sm:text-lg font-medium">
            Total Appointments
          </p>
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">
            {allAppmnt.length}
          </h1>
        </div>

        {/* Rejected Appointments */}
        <div className="bg-white rounded-2xl h-[140px] sm:h-[150px] shadow-md p-5 flex flex-col justify-between">
          <p className="text-gray-500 text-base sm:text-lg font-medium">
            Rejected Appointments
          </p>
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">
            {allAppmnt.filter((appmnt) => appmnt.status === "rejected").length}
          </h1>
        </div>

        {/* Pending Appointments */}
        <div className="bg-white rounded-2xl h-[140px] sm:h-[150px] shadow-md p-5 flex flex-col justify-between">
          <p className="text-gray-500 text-base sm:text-lg font-medium">
            Pending Appointments
          </p>
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">
            {allAppmnt.filter((appmnt) => appmnt.status === "pending").length}
          </h1>
        </div>
      </div>

      {/* Appointments List */}
      <div className="px-4 sm:px-6 md:px-8 pb-8">
        <Appointments />
      </div>
    </div>
  );
};

export default DoctorHome;
