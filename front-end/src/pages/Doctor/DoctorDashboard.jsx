import React from "react";
import Navbar from "../../componants/common/Navbar";
import Sidebar from "../../componants/common/Sidebar";
import TaskTable from "../../componants/doctor/TaskTable";

const DoctorDashboard = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex justify-center items-start px-2 sm:px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[1600px] overflow-hidden">
      
        <div className="flex flex-col md:flex-row h-full">
         
          <Sidebar />
           
          <div className="bg-gray-200 w-full p-4">
            <Navbar/>
            <TaskTable />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DoctorDashboard;
