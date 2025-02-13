// ProtectedRoute.js
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth); // Access user and role data
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Redirect to tasks page if role not allowed
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />; // Render child routes if authentication and role are valid
};

export default ProtectedRoute;
