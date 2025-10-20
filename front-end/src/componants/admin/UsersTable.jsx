import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserById, getAllUsers, getUserHistory } from "../../features/auth/authSlice";
import { getAllSpcl } from "../../features/doctor/specializationSlice";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.auth);
   const { allSpcl } = useSelector((state) => state.specialization);
   const { userHistory } = useSelector((state) => state.auth);

  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [specialization, setSpecialization] = useState(""); // 🔹 new state
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
    const [isHistoryModalOpen, setHistoryModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllSpcl())
  }, []);

  const handleEdit = (id) => {
    const userToEdit = allUsers.find((usr) => usr._id === id);
    setEditingId(id);
    setName(userToEdit.name);
    setEmail(userToEdit.email);
    setRole(userToEdit.role);
    setSpecialization(userToEdit.specialization || ""); // 🔹 load specialization if doctor
  };

  const handleCancel = () => {
    setEditingId(null);
    setName("");
    setEmail("");
    setRole("");
    setSpecialization("");
  };


    const handleViewHistory = async (patientId) => {
      try {
     
        dispatch(getUserHistory(patientId))
        setHistoryModalOpen(true);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch history");
      }
    };

  const handleSave = async (id) => {
   await dispatch(
      editUserById({
        id,
        updates: { name, email, role, specialization }, // 🔹 save specialization
      })
    );
    handleCancel();
    dispatch(getAllUsers())
  };

  const handleApprove = (id) => {
    dispatch(editUserById({ id, updates: { approved: "approved" } }));
  };

  const handleReject = (id) => {
    dispatch(editUserById({ id, updates: { approved: "rejected" } }));
  };

  // 🔹 Filter + Search
  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ? true : user.approved === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-1/3"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-1/4"
        >
          <option value="all">All</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>

              {/* 🔹 New Specialization Column */}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialization
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => {
                const userId = user._id;
                const isEditing = editingId === userId;

                return (
                  <tr
                    key={userId}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src="/doc.png"
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        {isEditing ? (
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                          />
                        ) : (
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      ) : (
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      )}
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                          <option value="user">User</option>
                          <option value="doctor">Doctor</option>
                          <option value="admin">Admin</option>
                        </select>
                      ) : (
                        <div className="text-sm text-gray-500">{user.role}</div>
                      )}
                    </td>

                    {/* 🔹 Specialization */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.role === "doctor" ? (
                        isEditing ? (

                           <select
                       type="text"
                            value={specialization}
                            onChange={(e) =>
                              setSpecialization(e.target.value)
                            }
                          className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        >
                         <option value="">Select Specialization</option>
                          {allSpcl.map((x)=>(
                             <option value={x._id} key={x._id}>{x.name}</option>
              ))}
                         
                        
                        </select>
                        
                         
                        ) : (
                          <div className="text-sm text-gray-500">
                            {user.specialization?.name || "—"}
                          </div>
                        )
                      ) : (
                        <div className="text-gray-400">N/A</div>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.approved === "approved" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      ) : user.approved === "rejected" ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          Rejected
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Pending
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(userId)}
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
                            onClick={() => handleEdit(userId)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600"
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleApprove(userId)}
                            className={`px-4 py-2 text-white rounded-lg font-semibold ${
                              user.approved === "approved"
                                ? "bg-green-400 cursor-not-allowed"
                                : "bg-green-600 hover:bg-green-700"
                            }`}
                            disabled={user.approved === "approved" || loading}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleViewHistory(userId)}
                            className="px-4 py-2 text-white rounded-lg font-semibold bg-violet-400"
                      
                          >
                            View History
                          </button>
                          <button
                            onClick={() => handleReject(userId)}
                            className={`px-4 py-2 text-white rounded-lg font-semibold ${
                              user.approved === "rejected"
                                ? "bg-red-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-700"
                            }`}
                            disabled={user.approved === "rejected" || loading}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>



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

export default UsersTable;
