import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserById, getAllUsers } from "../../features/auth/authSlice";
import {
  editSpclById,
  delSpclById,
  getAllSpcl,
  createSpcl,
} from "../../features/doctor/specializationSlice";

const SpclTable = () => {
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.auth);
  const { allSpcl } = useSelector((state) => state.specialization);

  const [editingId, setEditingId] = useState(null);
  const [creating, setCreating] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    dispatch(getAllSpcl());
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleEdit = (id) => {
    const spclToEdit = allSpcl.find((usr) => usr._id === id);
    setEditingId(id);
    setName(spclToEdit.name);
    setDescription(spclToEdit.description);
  };

  const handleCancel = () => {
    setEditingId(null);
    setCreating(false);
    setName("");
    setDescription("");
  };

  const handleSave = async (id) => {
    await dispatch(editSpclById({ id, updates: { name, description } }));
    dispatch(getAllSpcl());
    handleCancel();
  };

  const handleCreate = async () => {
    await dispatch(createSpcl({ name, description }));
    dispatch(getAllSpcl());
    handleCancel();
  };

  const handleDelete = async (id) => {
  await  dispatch(delSpclById(id));
     dispatch(getAllSpcl());
  };


  // 🔹 Filter + Search
  const filteredSpcl = allSpcl.filter((spcl) => {
    const matchesSearch = spcl.name
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 w-full sm:w-1/3"
        />

        {/* Create Button */}
        <button
          onClick={() => setCreating(true)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
        >
          + Create Specialization
        </button>
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
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CreatedAt
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {/* Create Row */}
            {creating && (
              <tr className="bg-green-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-white border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="bg-white border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                  New
                </td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <button
                    onClick={handleCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}

            {/* Existing Specializations */}
            {filteredSpcl.length > 0 ? (
              filteredSpcl.map((spcl, index) => {
                const spclId = spcl._id;
                const isEditing = editingId === spclId;

                return (
                  <tr
                    key={spclId}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      ) : (
                        <div className="text-sm font-medium text-gray-900">
                          {spcl.name}
                        </div>
                      )}
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="bg-gray-50 border rounded w-full py-1 px-2 focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                      ) : (
                        <div className="text-sm text-gray-500">
                          {spcl.description}
                        </div>
                      )}
                    </td>

                    {/* CreatedAt */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(spcl.createdAt).toLocaleDateString()}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-2">
                      {isEditing ? (
                        <>
                          <button
                            onClick={() => handleSave(spclId)}
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
                            onClick={() => handleEdit(spclId)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600"
                            disabled={loading}
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(spclId)}
                            className="px-4 py-2 text-white rounded-lg font-semibold bg-red-600 hover:bg-red-700"
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
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No specializations found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpclTable;
