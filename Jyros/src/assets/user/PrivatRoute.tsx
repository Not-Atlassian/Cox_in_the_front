import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AppContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
