import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserById, getAllUsers } from "../../features/auth/authSlice";
import {
  editSpclById,
  getAllSpcl,
  createSpcl,
} from "../../features/doctor/specializationSlice";
import { getAllPayment } from "../../features/common/paymentSlice";

const paymentTable = () => {
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.auth);

  const {allPayments} = useSelector((state)=> state.payments)

  const [editingId, setEditingId] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");



  useEffect(() => {
        dispatch(getAllPayment())

    dispatch(getAllUsers());
  }, [dispatch]);




  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Controls */}
     

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                date
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
         
          

            {/* Existing payments */}
            {allPayments.length > 0 ? (
              allPayments.map((payment, index) => {
                const paymentId = payment._id;
               

                return (
                  <tr
                    key={paymentId}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    {/* Name */}
                    <td className="px-6 py-4 whitespace-nowrap">
                     
                        <div className="text-sm font-medium text-gray-900">
                          {payment.doctor_id.name}
                        </div>
                    
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      
                      
                        <div className="text-sm text-gray-500">
                          {payment.patient_id.name}
                        </div>
                
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                     
                        <div className="text-sm text-gray-500">
                          {payment.status}
                        </div>
                  
                    </td>

                    {/* CreatedAt */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()}
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
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default paymentTable;
