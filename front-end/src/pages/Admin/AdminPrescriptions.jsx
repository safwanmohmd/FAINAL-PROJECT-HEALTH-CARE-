import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllAppmnt } from "../../features/doctor/appointmentSlice";
import { useDispatch, useSelector } from "react-redux";
import Appointments from "../../componants/doctor/Appointments";
import Sidebar from "../../componants/common/Sidebar";
import AdminPrescriptionTable from "../../componants/admin/AdminPrescriptionTable";

const AdminPrescriptions = () => {
  return (
    <>

    <div className="flex h-screen"><Sidebar />
      <div className="w-full bg-gray-200 p-4">
        <div className="mt-4 m-5 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
          <h2 className="text-lg font-semibold">All AdminPrescriptions</h2>
        </div>
        <AdminPrescriptionTable />
      </div>      
    </div>
    </>
  );
};

export default AdminPrescriptions;
