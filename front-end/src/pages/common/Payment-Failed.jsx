
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editPaymentById } from "../../features/common/paymentSlice";

const PaymentFailed = () => {
const dispatch = useDispatch()
  const navigate = useNavigate();
   const paymentId = localStorage.getItem("pendingPaymentId"); // string ID
useEffect(()=>{
  if (paymentId) {
    dispatch(editPaymentById({ id: paymentId, updates: { status: "failed" } }));
    localStorage.removeItem("pendingPaymentId");
  }
},[])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
         X Payment Failed
        </h2>
        <p className="text-gray-600 mb-6">
          Your appointment is not created. please try again
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

export default PaymentFailed;
