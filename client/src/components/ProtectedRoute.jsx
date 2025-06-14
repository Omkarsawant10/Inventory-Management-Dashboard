import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { PRODUCT_API_END_POINT } from '../utils/constants';

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${PRODUCT_API_END_POINT}/get`, { withCredentials: true });
        setAuth(true);
      } catch (err) {
        console.log(err)
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <div className="text-center mt-10">Loading...</div>;

  return auth ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
