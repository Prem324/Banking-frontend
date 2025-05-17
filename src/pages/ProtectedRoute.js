// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("userName")
    ? JSON.parse(localStorage.getItem("userName"))
    : undefined;
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
