import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../../features/auth/authSlice";
import { getMyPayment } from "../../features/common/paymentSlice";

const PaymentTable = () => {
  const dispatch = useDispatch();
  const { myPayments } = useSelector((state) => state.payments);

  useEffect(() => {
    dispatch(getMyPayment());
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto shadow-md sm:rounded-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-3">Selected Doctor</th>
              <th className="px-4 sm:px-6 py-3">Patient</th>
              <th className="px-4 sm:px-6 py-3">Status</th>
              <th className="px-4 sm:px-6 py-3">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {myPayments.length > 0 ? (
              myPayments.map((payment) => (
                <tr
                  key={payment._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* Doctor */}
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap font-medium text-gray-900">
                    {payment.doctor_id?.name || "N/A"}
                  </td>

                  {/* Patient */}
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-gray-700">
                    {payment.patient_id?.name || "N/A"}
                  </td>

                  {/* Status */}
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                    <span
                      className={`inline-block text-xs sm:text-sm font-medium text-white px-3 py-1 rounded-full ${
                        payment.status === "success"
                          ? "bg-green-500"
                          : payment.status === "pending"
                          ? "bg-yellow-500"
                          : payment.status === "failed"
                          ? "bg-red-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-gray-500">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-500 text-sm"
                >
                  No payments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
