import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyPrescriptions,
  deletePrescription,
  createPrescription,
} from "../../features/doctor/prescriptionSlice";
import { getAllAppmnt } from "../../features/doctor/appointmentSlice";
import toast from "react-hot-toast";

const PatientPrescriptionTable = () => {
  const { myPresc, loading } = useSelector((state) => state.prescription);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppmnt, setSelectedAppmnt] = useState(null);
  const [prescription, setPrescription] = useState("");

  useEffect(() => {
    dispatch(getMyPrescriptions());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePrescription(id));
    toast.success("Prescription deleted successfully");
  };

  const handleSavePrescription = async () => {
    try {
      const doctor = JSON.parse(localStorage.getItem("user"));
      const newPresc = {
        doctor_id: doctor._id,
        medicines: prescription,
        patient_id: selectedAppmnt?.patient_id?._id,
      };

      dispatch(createPrescription(newPresc));
      dispatch(getAllAppmnt());
      setIsModalOpen(false);
      toast.success("Prescription saved");
    } catch (error) {
      console.error(error);
      toast.error("Error saving prescription");
    }
  };

  return (
    <div className="px-3 sm:px-6 py-4">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg bg-white">
        {loading ? (
          <div className="p-6 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : myPresc.length === 0 ? (
          <div className="p-6 text-center text-gray-600 font-medium">
            No prescriptions found.
          </div>
        ) : (
          <table className="w-full text-sm text-left text-gray-500 min-w-[600px]">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 sm:px-6 py-3">Doctor</th>
                <th className="px-4 sm:px-6 py-3">Patient</th>
                <th className="px-4 sm:px-6 py-3">Specialization</th>
                <th className="px-4 sm:px-6 py-3">Medicines</th>
                <th className="px-4 sm:px-6 py-3">Status</th>
                <th className="px-4 sm:px-6 py-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {myPresc.map((presc) => (
                <tr
                  key={presc._id}
                  className={`border-b transition-colors ${
                    presc.status === "completed"
                      ? "bg-green-100 hover:bg-green-200"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 sm:px-6 py-3 font-medium text-gray-800">
                    {presc.doctor_id?.name || "N/A"}
                  </td>
                  <td className="px-4 sm:px-6 py-3">{presc.patient_id?.name || "N/A"}</td>
                  <td className="px-4 sm:px-6 py-3">Test</td>
                  <td className="px-4 sm:px-6 py-3 max-h-24 w-64">
                    <div className="max-h-24 overflow-auto break-words">
                      {presc.medicines}
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 capitalize">{presc.status}</td>
                  <td className="px-4 sm:px-6 py-3 text-center">
                    <button
                      onClick={() => handleDelete(presc._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 sm:px-4 py-2 rounded-md transition text-xs sm:text-sm"
                    >
                      Delete
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

export default PatientPrescriptionTable;
