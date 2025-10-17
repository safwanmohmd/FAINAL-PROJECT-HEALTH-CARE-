import React from 'react';
import { Navigate } from 'react-router-dom';

const IsAdmin = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // parse JSON

  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default IsAdmin;
