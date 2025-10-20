import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editApmntById,
  getDocAppmnt,
} from "../../features/doctor/appointmentSlice";
import { createPrescription } from "../../features/doctor/prescriptionSlice";
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

  const doctor = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getDocAppmnt());
  }, [dispatch]);

  // ✅ Approve / Save Prescription
  const handleApprove = (appmnt) => {
    setSelectedAppmnt(appmnt);
    setPrescription(appmnt.prescription || "");
    setIsModalOpen(true);
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
      await dispatch(
        editApmntById({
          id: selectedAppmnt._id,
          updates: { status: "completed" },
        })
      );
      dispatch(getDocAppmnt());
      setIsModalOpen(false);
      setSelectedAppmnt(null);
      setPrescription("");
    } catch (error) {
      console.error(error);
      alert("Error saving prescription");
    }
  };

  // ❌ Reject Appointment
  const handleReject = (appmnt) => {
    setSelectedAppmnt(appmnt);
    setConfirmIsModalOpen(true);
  };

  const confirmRejection = async () => {
    try {
      await dispatch(
        editApmntById({
          id: selectedAppmnt._id,
          updates: { status: "rejected" },
        })
      );
      dispatch(getDocAppmnt());
      setConfirmIsModalOpen(false);
      setSelectedAppmnt(null);
    } catch (error) {
      console.error(error);
      alert("Error rejecting appointment");
    }
  };

  // 🧾 View History
  const handleViewHistory = async (patientId) => {
    try {
      await dispatch(getUserHistory(patientId));
      setHistoryModalOpen(true);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch history");
    }
  };

  return (
    <div className=" bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="p-5 border-b bg-gray-50 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-700">Appointments</h2>
      </div>

      {loading ? (
        <div className="p-5 text-center text-gray-600 font-medium">
          Loading appointments...
        </div>
      ) : docAppmnt.length === 0 ? (
        <div className="p-5 text-center text-gray-600 font-medium">
          No appointments found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-xs uppercase text-gray-700">
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
                  className={`border-b ${
                    appmnt.status === "completed"
                      ? "bg-green-100"
                      : appmnt.status === "rejected"
                      ? "bg-red-100"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {appmnt.doctor_id.name}
                  </td>
                  <td className="px-6 py-4">{appmnt.patient_id.name}</td>
                  <td className="px-6 py-4">{appmnt.specialization.name}</td>
                  <td className="px-6 py-4 max-w-xs truncate">
                    {appmnt.description}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(appmnt.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 capitalize">{appmnt.status}</td>
                  <td className="px-6 py-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleApprove(appmnt)}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-lg hover:bg-green-200"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(appmnt)}
                      className="bg-red-200 text-red-700 px-3 py-1 rounded-lg hover:bg-red-300"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleViewHistory(appmnt.patient_id._id)}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200"
                    >
                      History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🧾 Prescription Modal */}
      {isModalOpen && selectedAppmnt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-3">Add Prescription</h2>
            <p>
              <strong>Doctor:</strong> {selectedAppmnt.doctor_id.name}
            </p>
            <p>
              <strong>Patient:</strong> {selectedAppmnt.patient_id.name}
            </p>

            <textarea
              value={prescription}
              onChange={(e) => setPrescription(e.target.value)}
              placeholder="Enter prescription"
              className="w-full border rounded-lg p-2 mt-4"
              rows={4}
            />

            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrescription}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ❌ Confirm Rejection Modal */}
      {isConfirmModalOpen && selectedAppmnt && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-bold mb-3">Reject Appointment?</h2>
            <p className="text-gray-600">
              Are you sure you want to reject this appointment?
            </p>
            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setConfirmIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmRejection}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📜 History Modal */}
      {isHistoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">Patient History</h2>

            <div>
              <h3 className="text-lg font-semibold mb-1">Appointments</h3>
              {userHistory.appointments?.length > 0 ? (
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {userHistory.appointments.map((a) => (
                    <li key={a._id}>
                      {a.status} — {a.doctor_id.name} —{" "}
                      {new Date(a.date).toLocaleDateString()} (
                      {a.specialization?.name})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No past appointments</p>
              )}
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-1">Prescriptions</h3>
              {userHistory.prescriptions?.length > 0 ? (
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  {userHistory.prescriptions.map((p) => (
                    <li key={p._id}>
                      {new Date(p.date).toLocaleDateString()} —{" "}
                      {p.doctor_id.name}: {p.medicines}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No prescriptions found</p>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setHistoryModalOpen(false)}
                className="px-5 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
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
