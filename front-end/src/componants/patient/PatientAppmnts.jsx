import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAppmntById,
  editApmntById,
  getMyAppmnt,
} from "../../features/doctor/appointmentSlice";
import {
  getMyPrescriptions,
} from "../../features/doctor/prescriptionSlice";

const PatientAppmnts = () => {
  const { myAppmnt = [], loading } = useSelector((state) => state.appointment);
  const { myPresc } = useSelector((state) => state.prescription);
  const [selectedDate, setSelectedDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppmnt, setSelectedAppmnt] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyAppmnt());
    dispatch(getMyPrescriptions());
  }, [dispatch]);

  const handleReject = async (appmnt) => {
    await dispatch(deleteAppmntById(appmnt._id));
    dispatch(getMyAppmnt());
  };

  const handleReschedule = async () => {
    await dispatch(
      editApmntById({ id: selectedAppmnt._id, updates: { date: selectedDate } })
    );
    dispatch(getMyAppmnt());
    setIsModalOpen(false);
  };

  const reschedule = (appmnt) => {
    setSelectedAppmnt(appmnt);
    setIsModalOpen(true);
  };

  return (
    <div className="m-4 sm:m-6">
      <div className="relative overflow-x-auto shadow-md rounded-xl">
        {loading ? (
          <div className="p-6 text-center text-gray-600 font-medium">
            Loading...
          </div>
        ) : myAppmnt.length === 0 ? (
          <div className="p-6 text-center text-gray-600 font-medium">
            No appointments found.
          </div>
        ) : (
          <table className="w-full text-sm sm:text-base text-left text-gray-700">
            <thead className="text-xs sm:text-sm text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-4 py-3 sm:px-6">Doctor</th>
                <th className="px-4 py-3 sm:px-6">Patient</th>
                <th className="px-4 py-3 sm:px-6">Specialization</th>
                <th className="px-4 py-3 sm:px-6">Description</th>
                <th className="px-4 py-3 sm:px-6">Date</th>
                <th className="px-4 py-3 sm:px-6">Prescription</th>
                <th className="px-4 py-3 sm:px-6">Status</th>
                <th className="px-4 py-3 sm:px-6 text-center">Action</th>
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
                        ? "bg-green-100 hover:bg-green-200"
                        : "bg-white hover:bg-gray-50"
                    } border-b transition`}
                  >
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                      {appmnt.doctor_id?.name}
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                      {appmnt.patient_id?.name}
                    </td>
                    <td className="px-4 py-3 sm:px-6">
                      {appmnt.specialization?.name}
                    </td>
                    <td className="px-4 py-3 sm:px-6 max-w-[10rem] sm:max-w-[16rem]">
                      <div className="overflow-auto max-h-24 break-words text-gray-600">
                        {appmnt.description}
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 whitespace-nowrap">
                      {appmnt.date}
                    </td>

                    {/* Prescription column */}
                    <td className="px-4 py-3 sm:px-6">
                      {appmnt.status === "completed" && presc ? (
                        <div className="text-sm text-blue-700 font-medium">
                          {presc.medicines}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">--</span>
                      )}
                    </td>

                    <td className="px-4 py-3 sm:px-6 capitalize">
                      <span
                        className={`${
                          appmnt.status === "completed"
                            ? "text-green-700 font-semibold"
                            : "text-yellow-600 font-medium"
                        }`}
                      >
                        {appmnt.status}
                      </span>
                    </td>

                    <td className="px-4 py-3 sm:px-6 flex flex-col sm:flex-row gap-2 justify-center sm:justify-start">
                      {appmnt.status !== "completed" ? (
                        <>
                          <button
                            onClick={() => handleReject(appmnt)}
                            className="bg-red-500 text-white px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-600 transition"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => reschedule(appmnt)}
                            className="bg-blue-500 text-white px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-600 transition"
                          >
                            Reschedule
                          </button>
                        </>
                      ) : (
                        <span className="text-green-800 font-semibold text-sm">
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

      {/* Modal */}
      {isModalOpen && selectedAppmnt && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 px-2">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md sm:max-w-xl">
            <h2 className="text-lg sm:text-xl font-bold mb-4">
              Appointment Details
            </h2>
            <div className="text-sm sm:text-base space-y-1">
              <p>
                <strong>Doctor:</strong> {selectedAppmnt.doctor_id?.name}
              </p>
              <p>
                <strong>Patient:</strong> {selectedAppmnt.patient_id?.name}
              </p>
              <p>
                <strong>Specialization:</strong>{" "}
                {selectedAppmnt.specialization?.name}
              </p>
              <p>
                <strong>Date:</strong> {selectedAppmnt.date}
              </p>
            </div>

            <input
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border rounded p-2 mt-4 text-sm sm:text-base"
              type="date"
            />

            <div className="mt-4 flex flex-col sm:flex-row justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm sm:text-base"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientAppmnts;
