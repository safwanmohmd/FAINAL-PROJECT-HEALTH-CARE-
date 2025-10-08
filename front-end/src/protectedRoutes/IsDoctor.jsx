import React from 'react';
import { Navigate } from 'react-router-dom';

const IsDoctor = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // parse JSON

  if (!user || user.role !== "doctor") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default IsDoctor;
