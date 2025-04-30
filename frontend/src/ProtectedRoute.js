import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Import the useAuth hook

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();  // Get authentication status

  if (!isAuthenticated) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  return <Outlet />;  // Allow access to the protected route if authenticated
};

export default ProtectedRoute;