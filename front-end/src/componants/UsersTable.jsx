import React, { useState } from "react";

const UsersTable = () => {
  const initialUsers = [
    { id: 1, name: "Jane Cooper", email: "jane.cooper@example.com", role: "user", approved: false, rejected: false },
    { id: 2, name: "John Doe", email: "john.doe@example.com", role: "doctor", approved: false, rejected: false },
    { id: 3, name: "Alice Smith", email: "alice.smith@example.com", role: "admin", approved: true, rejected: false },
    { id: 4, name: "Bob Johnson", email: "bob.johnson@example.com", role: "user", approved: false, rejected: true },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState(null);
  const [backupUser, setBackupUser] = useState(null);

  const handleEdit = (id) => {
    const userToEdit = users.find((u) => u.id === id);
    setBackupUser({ ...userToEdit });
    setEditingId(id);
  };

  const handleCancel = () => {
    setUsers((prev) =>
      prev.map((u) => (u.id === backupUser.id ? backupUser : u))
    );
    setEditingId(null);
    setBackupUser(null);
  };

  const handleChange = (id, field, value) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, [field]: value } : user))
    );
  };

  const handleSave = (id) => {
    setEditingId(null);
    setBackupUser(null);
    alert("Saved changes!");
  };

  const handleApprove = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, approved: true, rejected: false } : user
      )
    );
  };

  const handleReject = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, rejected: true, approved: false } : user
      )
    );
  };

  return (
    <div className="overflow-x-auto p-6 bg-gray-100 min-h-screen">
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user, index) => {
            const isEditing = editingId === user.id;
            return (
              <tr key={user.id} className="hover:bg-gray-100 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    {isEditing ? (
                      <input
                        type="text"
                        value={user.name}
                        onChange={(e) => handleChange(user.id, "name", e.target.value)}
                        className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                      />
                    ) : (
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing ? (
                    <input
                      type="text"
                      value={user.email}
                      onChange={(e) => handleChange(user.id, "email", e.target.value)}
                      className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{user.email}</div>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {isEditing ? (
                    <select
                      value={user.role}
                      onChange={(e) => handleChange(user.id, "role", e.target.value)}
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

                <td className="px-6 py-4 whitespace-nowrap">
                  {user.approved ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Approved
                    </span>
                  ) : user.rejected ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Rejected
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => handleSave(user.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
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
                        onClick={() => handleEdit(user.id)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleApprove(user.id)}
                        className={`px-4 py-2 text-white rounded-lg font-semibold ${
                          user.approved ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                        }`}
                        disabled={user.approved}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(user.id)}
                        className={`px-4 py-2 text-white rounded-lg font-semibold ${
                          user.rejected ? "bg-red-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                        }`}
                        disabled={user.rejected}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
