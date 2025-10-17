import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllAppmnt,
  editApmntById,
  deleteAppmntById,
} from "../../features/doctor/appointmentSlice";

const AppointmentTable = () => {
  const dispatch = useDispatch();
  const { allAppmnt, loading } = useSelector((state) => state.appointment);
  console.log("Appointments from Redux:", allAppmnt);

  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllAppmnt());
  }, [dispatch]);

  const handleEdit = (id) => {
    const appToEdit = allAppmnt.find((app) => app._id === id);
    setEditingId(id);
    setStatus(appToEdit.status);
    setDate(appToEdit.date ? appToEdit.date.split("T")[0] : "");
  };

  const handleCancel = () => {
    setEditingId(null);
    setStatus("");
    setDate("");
  };

  const handleSave = (id) => {
    dispatch(editApmntById({ id, updates: { status, date } }));
    handleCancel();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      dispatch(deleteAppmntById(id));
    }
  };

  const filteredAppointments = allAppmnt.filter((app) => {
    const matchesSearch =
      (app.patient?.name || app.patient_id?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (app.doctor?.name || app.doctor_id?.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by patient or doctor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-1/3"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-1/4"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app, index) => {
                const appId = app._id;
                const isEditing = editingId === appId;

                return (
                  <tr key={appId} className="hover:bg-gray-100 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {app.patient_id?.name || "Unknown"}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {app.doctor_id?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4 max-h-20 w-64">
                      <div className="max-h-20 overflow-auto break-words">{app.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      ) : (
                        <div className="text-sm text-gray-500">{app.date?.split("T")[0] || "N/A"}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value)}
                          className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : app.status === "approved" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Approved</span>
                      ) : app.status === "completed" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completed</span>
                      ) : app.status === "cancelled" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(appId)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                            disabled={loading}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(appId)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(appId)}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600"
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
