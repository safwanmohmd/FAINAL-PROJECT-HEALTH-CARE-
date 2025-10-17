import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllAppmnt } from "../../features/doctor/appointmentSlice";
import axios from "axios";
import { createPrescription, deletePrescription, getAllPrescriptions } from "../../features/doctor/prescriptionSlice";
import toast from "react-hot-toast";

const PrescriptionTable = () => {
  const { allPresc, loading } = useSelector((state) => state.prescription);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getAllPrescriptions());
    console.log(allPresc);
  }, []);

  const handleDelete = (id) => {
    
   dispatch(deletePrescription(id))
  };



  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-5">
        {loading ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : allPresc.length === 0 ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            No PrescriptionTable found.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">Doctor</th>
                <th className="px-6 py-3">Patient</th>
                <th className="px-6 py-3">Medicines</th>
                <th className="px-6 py-3">Date</th>
            
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {allPresc.map((presc) => (
                <tr
                  key={presc._id}
                  className={`${
                    presc.status === "completed"
                      ? "bg-green-300 hover:bg-green-400"
                      : "bg-white"
                  } border-b hover:bg-gray-50`}
                >
                  <td className="px-6 py-4">{presc.doctor_id.name}</td>
                  <td className="px-6 py-4">{presc.patient_id.name}</td>
                 
                  <td className="px-6 py-4 max-h-20 w-64">
                    <div className="max-h-20 overflow-auto break-words">
                      {presc.medicines}
                    </div>
                  </td>
               <td className="px-6 py-4">{presc.date}</td>
                  <td className="px-6 py-4">
                    
                    <button
                      onClick={() => handleDelete(presc._id)}
                      className="m-2 bg-red-300 text-white px-4 py-2 rounded hover:underline"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

   
    </div>
  );
};

export default PrescriptionTable;
