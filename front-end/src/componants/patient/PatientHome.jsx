import React, { useEffect, useState } from "react";
import { getMyAppmnt } from "../../features/doctor/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Appointments from "../patient/PatientAppmnts";
import { getAllDoctors } from "../../features/auth/authSlice";

const PatientHome = () => {
  const { allAppmnt, myAppmnt } = useSelector((state) => state.appointment);
  const { allDoctors } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAppmnt());
    dispatch(getAllDoctors());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-blue-700 to-sky-600 relative rounded-xl overflow-hidden shadow-md mt-4 mx-4 sm:mx-6 lg:mx-10 flex flex-col sm:flex-row items-center justify-between p-6 sm:p-10">
        {/* Left text */}
        <div className="text-center sm:text-left max-w-xl">
          <h1 className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
            Find the best doctors with Health Care
          </h1>
          <p className="text-white text-sm sm:text-base mb-4">
            Appoint doctors and get the finest medical services.
          </p>
          <button
            onClick={() => (window.location.href = "/bookappointment")}
            className="bg-white text-blue-700 font-semibold px-5 py-2 rounded-lg shadow-md hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Book Now
          </button>
        </div>

        {/* Right illustration */}
        <div className="mt-4 sm:mt-0 sm:absolute sm:right-4 sm:bottom-0 h-40 sm:h-56 lg:h-64">
          <img
            src="/doc.png"
            alt="Doctor"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 lg:p-10">
        {/* Total Doctors */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between text-center sm:text-left">
          <p className="text-gray-500 text-base font-medium">
            Total Doctors
          </p>
          <h1 className="text-gray-900 text-3xl font-bold mt-2">
            {allDoctors.length}
          </h1>
        </div>

        {/* My Appointments */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between text-center sm:text-left">
          <p className="text-gray-500 text-base font-medium">
            My Appointments
          </p>
          <h1 className="text-gray-900 text-3xl font-bold mt-2">
            {myAppmnt.length}
          </h1>
        </div>

        {/* Rejected Appointments */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between text-center sm:text-left">
          <p className="text-gray-500 text-base font-medium">
            My Rejected Appointments
          </p>
          <h1 className="text-gray-900 text-3xl font-bold mt-2">
            {myAppmnt.filter((a) => a.status === "rejected").length}
          </h1>
        </div>

        {/* Pending Appointments */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between text-center sm:text-left">
          <p className="text-gray-500 text-base font-medium">
            My Pending Appointments
          </p>
          <h1 className="text-gray-900 text-3xl font-bold mt-2">
            {myAppmnt.filter((a) => a.status === "pending").length}
          </h1>
        </div>
      </div>

      {/* My Appointments Section */}
      <div className="mt-4 sm:mt-6 bg-white rounded-2xl shadow-md p-4 sm:p-6 mx-4 sm:mx-6 lg:mx-10 mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
          My Appointments
        </h2>

        {/* Scroll wrapper for table on mobile */}
        <div className="max-h-[450px] overflow-y-auto overflow-x-auto rounded-lg border border-gray-100">
          <Appointments />
        </div>
      </div>
    </div>
  );
};

export default PatientHome;
