import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editApmntById, getDocAppmnt } from "../../features/doctor/appointmentSlice";
import { createPrescription } from "../../features/doctor/prescriptionSlice";
import axios from "axios";
import { getUserHistory } from "../../features/auth/authSlice";

const Appointments = () => {
  const { docAppmnt, loading } = useSelector((state) => state.appointment);
  const { userHistory } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmIsModalOpen] = useState(false);
  const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);

  const [selectedAppmnt, setSelectedAppmnt] = useState(null);
  const [prescription, setPrescription] = useState("");
  const [historyData, setHistoryData] = useState(null);

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
    setConfirmIsModalOpen(true);
  };

  const handleSavePrescription = async () => {
    try {
      const newPresc = {
        appointment_id: selectedAppmnt._id,
        doctor_id: doctor._id,
        patient_id: selectedAppmnt.patient_id._id,
        medicines: prescription,
      };

      await dispatch(createPrescription(newPresc));
      await dispatch(editApmntById({ id: selectedAppmnt._id, updates: { status: "completed" } }));
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
      await dispatch(editApmntById({ id: selectedAppmnt._id, updates: { status: "rejected" } }));
      dispatch(getDocAppmnt());
      setConfirmIsModalOpen(false);
      setSelectedAppmnt(null);
    } catch (error) {
      console.error(error);
      alert("Error rejecting appointment");
    }
  };

  // 🧾 Fetch user history
  const handleViewHistory = async (patientId) => {
    try {
   
      dispatch(getUserHistory(patientId))
      setHistoryModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch history");
    }
  };

  return (
    <div>
      {/* Appointments Table */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4 m-5">
        {loading ? (
          <div className="p-5 text-center text-gray-600 font-medium">Loading...</div>
        ) : docAppmnt.length === 0 ? (
          <div className="p-5 text-center text-gray-600 font-medium">No appointments found.</div>
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
                  <td className="px-6 py-4">{new Date(appmnt.date).toLocaleString()}</td>
                  <td className="px-6 py-4">{appmnt.status}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button
                      onClick={() => handleApprove(appmnt)}
                      className="bg-green-200 text-green-600 px-3 py-1 rounded hover:bg-green-300"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(appmnt)}
                      className="bg-red-300 text-white px-3 py-1 rounded hover:bg-red-400"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleViewHistory(appmnt.patient_id._id)}
                      className="bg-blue-200 text-blue-600 px-3 py-1 rounded hover:bg-blue-300"
                    >
                      View History
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
            <h2 className="text-xl font-bold mb-4">Add Prescription</h2>
            <p><strong>Doctor:</strong> {selectedAppmnt.doctor_id.name}</p>
            <p><strong>Patient:</strong> {selectedAppmnt.patient_id.name}</p>
            <p><strong>Specialization:</strong> {selectedAppmnt.specialization.name}</p>

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

      {/* Confirm Reject Modal */}
      {isConfirmModalOpen && selectedAppmnt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-xl">
            <h2 className="text-xl font-bold mb-4">Reject Appointment?</h2>
            <p>Are you sure you want to reject this appointment?</p>

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirmIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmRejection}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">Patient History</h2>

            <h3 className="text-lg font-semibold mt-2 mb-1">Appointments</h3>
            {userHistory.appointments?.length > 0 ? (
              <ul className="list-disc pl-6 text-gray-700">
                {userHistory.appointments.map((a) => (
                  <li key={a._id}>
                    <strong>{a.status} -- {a.doctor_id.name} -- </strong> - {a.date} ({a.specialization?.name})
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No past appointments</p>
            )}

            <h3 className="text-lg font-semibold mt-4 mb-1">Prescriptions</h3>
            {userHistory.prescriptions?.length > 0 ? (
              <ul className="list-disc pl-6 text-gray-700">
                {userHistory.prescriptions.map((p) => (
                  <li key={p._id}>
                    {p.date} -- {p.doctor_id.name} — {p.medicines}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No prescriptions found</p>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="px-5 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
