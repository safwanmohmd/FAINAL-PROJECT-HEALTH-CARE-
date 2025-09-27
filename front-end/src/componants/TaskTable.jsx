import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllAppmnt } from "../features/doctor/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Appointments from "./Appointments";

const TaskTable = () => {
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
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3000/api/tasks",
        { title, description, dueDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Task created successfully");
      setTitle("");
      setDescription("");
      setDueDate("");
      setShowForm(false);
    } catch (err) {
      console.error(err.message);
      alert("Error creating task");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left side (70%) */}
      <div className="w-[70%] bg-gray-200 p-4">
        <div className="mt-4 m-5 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
          <h2 className="text-lg font-semibold">My Tasks</h2>
        </div>

       <div className="bg-gradient-to-b from-blue-700 to-sky-600 h-[230px] relative rounded-xl overflow-hidden shadow-md mt-4 mx-5 flex items-center">
  {/* Left text */}
  <div className="pl-8 max-w-lg">
    <h1 className="text-white text-3xl font-bold mb-2">
      Find the best doctors with Health Care
    </h1>
    <p className="text-white text-sm">
      Appoint the doctors and get finest medical services.
    </p>
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
    <p className="text-gray-500 text-lg font-medium">Total Appointments</p>
    <h1 className="text-gray-900 text-3xl font-bold">{allAppmnt.length}</h1>
  </div>

  {/* Rejected Appointments */}
  <div className="bg-white rounded-2xl h-[150px] shadow-md p-6 flex flex-col justify-between">
    <p className="text-gray-500 text-lg font-medium">Rejected Appointments</p>
    <h1 className="text-gray-900 text-3xl font-bold"> {allAppmnt.filter((appmnt) => appmnt.status === "rejected").length}</h1>
  </div>

  {/* Pending Appointments */}
  <div className="bg-white rounded-2xl h-[150px] shadow-md p-6 flex flex-col justify-between">
    <p className="text-gray-500 text-lg font-medium">Pending Appointments</p>
    <h1 className="text-gray-900 text-3xl font-bold"> {allAppmnt.filter((appmnt) => appmnt.status === "pending").length}</h1>
  </div>
</div>



        {/* Task Form */}
        {showForm && (
          <div className="m-5 p-5 bg-gray-100 rounded-xl shadow-lg">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full max-w-md"
            >
              <input
                type="text"
                placeholder="Task Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-2 border rounded-lg w-full"
                required
              />
              <input
                type="text"
                placeholder="Task Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 border rounded-lg w-full"
                required
              />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="p-2 border rounded-lg w-full"
                required
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </form>
          </div>
        )}

        {/* Task List */}
        <Appointments />
      </div>

      {/* Right side (30%) */}
      <div className="w-[30%] bg-gray-400 p-4">
        <h1 className="text-xl font-bold">Right Section</h1>
        <p>This takes up 30% of the screen.</p>
      </div>
    </div>
  );
};

export default TaskTable;
