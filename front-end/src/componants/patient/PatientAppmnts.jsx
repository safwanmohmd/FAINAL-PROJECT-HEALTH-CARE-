import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAppmntById, getMyAppmnt } from "../../features/doctor/appointmentSlice";
import { createPrescription, getMyPrescriptions } from "../../features/doctor/prescriptionSlice";

const PatientAppmnts = () => {
  const { myAppmnt = [], loading } = useSelector((state) => state.appointment);
  const { myPresc } = useSelector((state) => state.prescription);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAppmnt());
    dispatch(getMyPrescriptions())
  }, [dispatch]);



  const handleReject = async (appmnt) => {
    // TODO: dispatch rejectAppointment here
   await dispatch(deleteAppmntById(appmnt._id))
   dispatch(getMyAppmnt())
  };

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-5">
        {loading ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : myAppmnt.length === 0 ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            No appointments found.
          </div>
        ) : (
         <table className="w-full text-sm text-left text-gray-500">
  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
    <tr>
      <th className="px-6 py-3">Doctor</th>
      <th className="px-6 py-3">Patient</th>
      <th className="px-6 py-3">Specialization</th>
      <th className="px-6 py-3">Description</th>
      <th className="px-6 py-3">Prescription</th>
      <th className="px-6 py-3">Status</th>
      <th className="px-6 py-3">Action</th>
    </tr>
  </thead>
  <tbody>
    {myAppmnt.map((appmnt) => {
    
      const presc = myPresc?.find(
        (p) => p.appointment_id === appmnt._id
      );

      return (
        <tr
          key={appmnt._id}
          className={`${
            appmnt.status === "completed"
              ? "bg-green-300 hover:bg-green-400"
              : "bg-white"
          } border-b hover:bg-gray-50`}
        >
          <td className="px-6 py-4">{appmnt.doctor_id.name}</td>
          <td className="px-6 py-4">{appmnt.patient_id.name}</td>
          <td className="px-6 py-4">{appmnt.specialization?.name}</td>
          <td className="px-6 py-4 max-h-20 w-64">
            <div className="max-h-20 overflow-auto break-words">
              {appmnt.description}
            </div>
          </td>

          {/* Prescription column */}
          <td className="px-6 py-4">
            {appmnt.status === "completed" && presc ? (
              <div className="text-sm text-blue-700 font-medium">
                {presc.medicines}
              </div>
            ) : (
              <span className="text-gray-400 italic">--</span>
            )}
          </td>

          <td className="px-6 py-4">{appmnt.status}</td>
          <td className="px-6 py-4 flex gap-2">
            {appmnt.status !== "completed" ? (
              <>
              
                <button
                  onClick={() => handleReject(appmnt)}
                  className="bg-red-300 text-white px-4 py-2 rounded hover:underline"
                >
                  Cancel Appointment
                </button>
              </>
            ) : (
              <span className="text-green-800 font-semibold">
                Completed
              </span>
            )}
          </td>
        </tr>
      );
    })}
  </tbody>
</table>

        )}
      </div>

    
    </div>
  );
};

export default PatientAppmnts;
