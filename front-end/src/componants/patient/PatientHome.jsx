import React, { useEffect, useState } from "react";
import axios from "axios";
import { getMyAppmnt } from "../../features/doctor/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Appointments from "../patient/PatientAppmnts";
import { getAllDoctors } from "../../features/auth/authSlice";

const PatientHome = () => {
  const { allAppmnt ,myAppmnt} = useSelector((state) => state.appointment);
  const { allDoctors } = useSelector((state) => state.auth);
 
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAppmnt())
    dispatch(getAllDoctors())
  }, [dispatch]);

 

  return (
    <div className="flex h-screen">
      {/* Left side (70%) */}
      <div className="w-full bg-gray-200 p-4">
        

       <div className="bg-gradient-to-b from-blue-700 to-sky-600 h-[230px] relative rounded-xl overflow-hidden shadow-md mt-4 mx-5 flex items-center">
  {/* Left text */}
  <div className="pl-8 max-w-lg">
    <h1 className="text-white text-3xl font-bold mb-2">
      Find the best doctors with Health Care
    </h1>
    <p className="text-white text-sm">
      Appoint the doctors and get finest medical services.
    </p>
     {/* Book Now Button */}
    <button
      onClick={() => window.location.href = "/bookappointment"} 
      className="mt-1.5 bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition"
    >
      Book Now
    </button>
  </div>

  {/* Right illustration */}
  <div className="absolute right-0 bottom-0 h-full">
    <img
      src="../../media/doc.png" 
      alt="Doctor"
      className="h-full object-contain"
    />
  </div>
</div>


       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-4">
  {/* Total Doctors */}
  <div className="bg-white rounded-2xl h-[150px] shadow-md p-6 flex flex-col justify-between">
    <p className="text-gray-500 text-lg font-medium">Total Doctors</p>
    <h1 className="text-gray-900 text-3xl font-bold">{allDoctors.length}</h1>
  </div>

  {/* Total Appointments */}
  <div className="bg-white rounded-2xl h-[150px] shadow-md p-6 flex flex-col justify-between">
    <p className="text-gray-500 text-lg font-medium">My Appointments</p>
    <h1 className="text-gray-900 text-3xl font-bold">{myAppmnt.length}</h1>
  </div>

  {/* Rejected Appointments */}
  <div className="bg-white rounded-2xl h-[150px] shadow-md p-6 flex flex-col justify-between">
    <p className="text-gray-500 text-lg font-medium">My Rejected Appointments</p>
    <h1 className="text-gray-900 text-3xl font-bold"> {myAppmnt.filter((appmnt) => appmnt.status === "rejected").length}</h1>
  </div>

  {/* Pending Appointments */}
  <div className="bg-white rounded-2xl h-[150px] shadow-md p-6 flex flex-col justify-between">
    <p className="text-gray-500 text-lg font-medium">My Pending Appointments</p>
    <h1 className="text-gray-900 text-3xl font-bold"> {myAppmnt.filter((appmnt) => appmnt.status === "pending").length}</h1>
  </div>
</div>
       {/* Task List */}
<div className="mt-6 bg-white rounded-2xl shadow-md p-4 mx-5">
  <h2 className="text-lg font-semibold text-gray-700 mb-3">My Appointments</h2>
  <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
    <Appointments />
  </div>
</div>
      </div>

      {/* Right side (30%) */}
      {/* <div className="w-[30%] bg-gray-400 p-4">
        <h1 className="text-xl font-bold">Right Section</h1>
        <p>This takes up 30% of the screen.</p>
      </div> */}
    </div>
  );
};

export default PatientHome;
