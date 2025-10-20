import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePrescription,
  getDocPrescriptions,
} from "../../features/doctor/prescriptionSlice";
import toast from "react-hot-toast";

const PrescriptionTable = () => {
  const { docPresc, loading } = useSelector((state) => state.prescription);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDocPrescriptions());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePrescription(id))
      .unwrap()
      .then(() => {
        toast.success("Prescription deleted successfully");
        dispatch(getDocPrescriptions()); // refresh after delete
      })
      .catch(() => toast.error("Failed to delete prescription"));
  };

  return (
    <div className="">
      <div className="relative overflow-x-auto shadow-md rounded-xl">
        {loading ? (
          <div className="p-6 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : docPresc.length === 0 ? (
          <div className="p-6 text-center text-gray-600 font-medium">
            No prescriptions found.
          </div>
        ) : (
          <table className="w-full text-sm sm:text-base text-left text-gray-700">
            <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-3 sm:px-6">Doctor</th>
                <th className="px-4 py-3 sm:px-6">Patient</th>
                <th className="px-4 py-3 sm:px-6">Medicines</th>
                <th className="px-4 py-3 sm:px-6">Date</th>
                <th className="px-4 py-3 sm:px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {docPresc.map((presc) => (
                <tr
                  key={presc._id}
                  className={`${
                    presc.status === "completed"
                      ? "bg-green-100 hover:bg-green-200"
                      : "bg-white hover:bg-gray-50"
                  } border-b transition`}
                >
                  <td className="px-4 py-3 sm:px-6">{presc.doctor_id?.name}</td>
                  <td className="px-4 py-3 sm:px-6">{presc.patient_id?.name}</td>
                  <td className="px-4 py-3 sm:px-6 max-w-[10rem] sm:max-w-[16rem]">
                    <div className="overflow-auto max-h-24 break-words text-gray-600">
                      {presc.medicines}
                    </div>
                  </td>
                  <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                    {new Date(presc.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 sm:px-6 text-center">
                    <button
                      onClick={() => handleDelete(presc._id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm hover:bg-red-600 transition"
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

export default PrescriptionTable;
