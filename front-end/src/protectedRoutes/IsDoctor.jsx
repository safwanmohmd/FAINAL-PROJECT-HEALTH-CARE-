import React from 'react';
import { Navigate } from 'react-router-dom';

const IsDoctor = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect if user not logged in or not doctor/admin
  if (!user || (user.role !== "doctor" && user.role !== "admin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default IsDoctor;
