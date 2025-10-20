import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllDoctors } from "../../features/auth/authSlice";
import {
  createAppmnt,
  createStripeUrl,
} from "../../features/doctor/appointmentSlice";
import toast from "react-hot-toast";
import { createPayment } from "../../features/common/paymentSlice";

const BookAppointment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const { loading, error } = useSelector((state) => state.appointment);
  const { allDoctors } = useSelector((state) => state.auth);

  // Local state
  const [selectedDoc, setSelectedDoc] = useState("");
  const [selectedSpcl, setSelectedSpcl] = useState("");
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  // Fetch doctors when component mounts
  useEffect(() => {
    dispatch(getAllDoctors());
  }, [dispatch]);

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDoc || !description || !selectedDate) {
      toast.error("Please select a doctor, date and add your notes!");
      return;
    }

    const newAppmnt = {
      patient_id: user?._id,
      doctor_id: selectedDoc,
      specialization: selectedSpcl,
      description,
      date: selectedDate,
      status: "pending",
    };
    
     const newPayment = {
        patient_id: user?._id,
        doctor_id: selectedDoc,
        status:"pending"
    }
dispatch(createPayment(newPayment))
     localStorage.setItem("pendingAppointment", JSON.stringify(newAppmnt));
    
     await dispatch( createStripeUrl({  items: [{ name: "doctor-appointment", price: 99 }], })
    );
    
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="shadow-2xl rounded-2xl bg-white w-[80%] max-w-7xl flex overflow-hidden">
        {/* Left Section */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-blue-400 p-6 relative">
          <div className="absolute w-[400px] h-[400px] bg-teal-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30 hidden md:block"></div>
          <img
            src="/doc.png"
            alt="Doctor"
            className="relative max-w-[350px] md:max-w-[400px] object-contain z-10 mb-4"
          />
          <h1 className="text-2xl font-bold text-white z-10">Welcome Back!</h1>
          <p className="text-white mt-2 text-sm text-center z-10">
            What do you want from this consult? (diagnosis, prescription,
            referral, second opinion, sick note)
          </p>
        </div>

        {/* Right Section */}
        <div className="w-1/2 p-8 flex flex-col bg-gray-50 justify-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Book An Appointment
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Choose Doctor */}
            <label className="text-gray-500 text-sm" htmlFor="doc">
              Choose Your Doctor
            </label>
            <select
              id="doc"
              value={selectedDoc}
              onChange={(e) => {
                setSelectedDoc(e.target.value);
                const doctor = allDoctors.find((d) => d._id === e.target.value);
                setSelectedSpcl(doctor?.specialization?._id || "");
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            >
              <option value="">Select a Doctor</option>
              {allDoctors?.map((x) => (
                <option key={x._id} value={x._id}>
                  {x.name} ({x.specialization?.name})
                </option>
              ))}
            </select>

            {/* Health Concern Notes */}
            <label className="text-gray-500 text-sm" htmlFor="date">
              Choose A Date
            </label>
            <input
              id="date"
              type="date"
              value={selectedDate} // ✅ controlled input
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            />
            <label className="text-gray-500 text-sm" htmlFor="notes">
              Describe Your Health Concern
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              id="notes"
              rows={6}
              placeholder="Explain your condition for the doctor (e.g., pain, duration, medications used)..."
            />

            {/* Submit Button */}
            <button
              disabled={loading}
              className="bg-blue-500 shadow-md text-white font-semibold hover:bg-blue-600 py-2 rounded-md transition duration-200 text-sm disabled:opacity-50"
              type="submit"
            >
              {loading ? "Booking..." : "Book Appointment"}
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
