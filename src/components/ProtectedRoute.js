import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        setIsAuthenticated(true);
        setIsLoading(false);
      } else {
        try {
          const response = await fetch('http://localhost:5000/refresh', { credentials: 'include' });
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem('accessToken', data.accessToken);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
  
        } catch (error) {
          console.error('Error checking refresh token.', error);
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return ( 
      <div>
        Loading
      </div>
    )
  }

  return isAuthenticated ? children : <Navigate to='/signin' />

}

export default ProtectedRoute;
