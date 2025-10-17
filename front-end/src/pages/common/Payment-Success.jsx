import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAppmnt } from "../../features/doctor/appointmentSlice";
import { editPaymentById } from "../../features/common/paymentSlice";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

useEffect(() => {
  const appointmentData = JSON.parse(localStorage.getItem("pendingAppointment"));
  const paymentId = localStorage.getItem("pendingPaymentId"); // string ID

  if (appointmentData) {
    dispatch(createAppmnt(appointmentData));
    localStorage.removeItem("pendingAppointment");
  }

  if (paymentId) {
    dispatch(editPaymentById({ id: paymentId, updates: { status: "success" } }));
    localStorage.removeItem("pendingPaymentId");
  }
}, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">
          🎉 Payment Successful!
        </h2>
        <p className="text-gray-600 mb-6">
          Your appointment is being created. Thank you for your payment.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
