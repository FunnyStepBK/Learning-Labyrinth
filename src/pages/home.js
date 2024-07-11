import React, { useState } from 'react';
import styles from '../Styles/home.module.css'
import logoutUser from './utils/logout';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(false);
  const navigate = useNavigate();
  
  const logout = async () => {
    try {
      const response = await logoutUser();
      localStorage.removeItem('accessToken');
      setResponseStatus(true);
      setResponseMessage('Logged out successfully.');

      // Navigate to the landing page after 5 seconds
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      console.error('Logout failed:', error);
      setResponseMessage('Logout failed. Please try again.');
    }
  };
  
  return (
    <>
      <div>
        {!responseStatus ? (
          <div>
            <div>
              <span className={`material-symbols-outlined`} id={styles.settings} onClick={logout}>
                settings
              </span>
            </div>
            <h1>
              Home
            </h1>
          </div>
        ) : (
          <div>
            {responseMessage}
          </div>
        )}
      </div>
    </>
  )
}