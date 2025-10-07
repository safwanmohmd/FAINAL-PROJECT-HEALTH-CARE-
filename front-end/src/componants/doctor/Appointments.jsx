import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editApmntById, getAllAppmnt, getDocAppmnt } from "../../features/doctor/appointmentSlice";
import { createPrescription } from "../../features/doctor/prescriptionSlice";

const Appointments = () => {
  const { docAppmnt, loading } = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmIsModalOpen] = useState(false);
  const [selectedAppmnt, setSelectedAppmnt] = useState(null);
  const [prescription, setPrescription] = useState("");

  const doctor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getDocAppmnt());
  }, [dispatch]);

  const handleApprove = (appmnt) => {
    setSelectedAppmnt(appmnt);
    setPrescription(appmnt.prescription || "");
    setIsModalOpen(true);
  };
  const handleReject = (appmnt) => {
    setSelectedAppmnt(appmnt);
    setPrescription(appmnt.prescription || "");
    setConfirmIsModalOpen(true);
  };

  const handleSavePrescription = async () => {
    try {
      const newPresc = {
        appointment_id: selectedAppmnt._id, // must match your schema
        doctor_id: doctor._id,
        patient_id: selectedAppmnt.patient_id._id,
        medicines: prescription,
      };

      // Wait for prescription creation to complete
      await dispatch(createPrescription(newPresc));
      await dispatch(editApmntById({id :selectedAppmnt._id, updates: {status : "completed"}}))
  
      // Refresh appointments after saving
      dispatch(getDocAppmnt());

      setIsModalOpen(false);
      setSelectedAppmnt(null);
      setPrescription("");
    } catch (error) {
      console.error(error);
      alert("Error saving prescription");
    }
  };
  const confirmRejection = async () => {
    try {
      await dispatch(editApmntById({id :selectedAppmnt._id, updates: {status : "rejected"}}))
  
      // Refresh appointments after saving
      dispatch(getDocAppmnt());

      setConfirmIsModalOpen(false);
      setSelectedAppmnt(null);
      setPrescription("");
    } catch (error) {
      console.error(error);
      alert("Error saving prescription");
    }
  };

  return (
    <div>
      {/* Appointments Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-5">
        {loading ? (
          <div className="p-5 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : docAppmnt.length === 0 ? (
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
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {docAppmnt.map((appmnt) => (
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
                  <td className="px-6 py-4">{appmnt.specialization.name}</td>
                  <td className="px-6 py-4 max-h-20 w-64">
                    <div className="max-h-20 overflow-auto break-words">
                      {appmnt.description}
                    </div>
                  </td>
                  <td className="px-6 py-4">{appmnt.date}</td>
                  <td className="px-6 py-4">{appmnt.status}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleApprove(appmnt)}
                      className="bg-green-200 text-green-600 px-4 py-2 rounded hover:underline"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(appmnt)}
                      className="m-2 bg-red-300 text-white px-4 py-2 rounded hover:underline"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Prescription Modal */}
      {isModalOpen && selectedAppmnt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
            <p><strong>Doctor:</strong> {selectedAppmnt.doctor_id.name}</p>
            <p><strong>Patient:</strong> {selectedAppmnt.patient_id.name}</p>
            <p><strong>Specialization:</strong> {selectedAppmnt.specialization.name}</p>
            <p><strong>Date:</strong> {selectedAppmnt.description}</p>

            <textarea
              placeholder="Enter prescription"
              className="w-full border rounded p-2 mt-4"
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrescription}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}


      {isConfirmModalOpen && selectedAppmnt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Appointment Details</h2>
            <p><strong>Doctor:</strong> {selectedAppmnt.doctor_id.name}</p>
            <p><strong>Patient:</strong> {selectedAppmnt.patient_id.name}</p>
            <p><strong>Specialization:</strong> {selectedAppmnt.specialization.name}</p>
            <p><strong>Date:</strong> {selectedAppmnt.description}</p>

           

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmRejection}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
