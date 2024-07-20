import React, { useState, useEffect } from 'react';
import styles from '../Styles/register-auth.module.css';
import sendFormData from './utils/sendFormData';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from './utils/checkLogin';

export default function SignUp() {
  const [responseMessage, setResponseMessage] = useState('');
  const [responseCode, setResponseCode] = useState('');
  const [responseStatus, setResponseStatus] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const authenticated = await isLoggedIn();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setTimeout(() => {
          window.location.href = 'http://localhost:3000/home';
        }, 4000);
      }
    };

    checkLogin();
  }, [navigate]);

  const getFormInputs = async () => {
    const formData = {
      email: document.querySelector(`#${styles.email}`)?.value,
      password: document.querySelector(`#${styles.password}`)?.value,
    };

    try {
      const response = await sendFormData(formData, 'login');
      setResponseMessage(`Successfully logged in as ${response.username}`);
      setResponseStatus(true);
      setResponseSuccess(true);
      localStorage.setItem('accessToken', response.accessToken);
      setTimeout(() => {
        window.location.href = 'http://localhost:3000/home';
      }, 4000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      const errorCode = error.response?.data?.errorCode || 'Unknown error code';
      setResponseMessage(`${errorCode}: ${errorMessage}`);
      setResponseCode(errorCode);
      setResponseStatus(true);
      setResponseSuccess(false);
    }
  };

  return (
    <div id={styles.container}>
      <div id={styles.cardContainer}>
        {isAuthenticated ? (
          <div>
            <h1>
              All Set
            </h1>
            Your are Logged In!
            <a href='http://localhost:3000/home'>
              Go to Home page. 
            </a>
          </div>
        ) : (!responseStatus ? (
            <div id={styles.form}>
              <div id={styles.textFields}>
                <input
                  className={styles.textInputs}
                  type="email"
                  id={styles.email}
                  name="email"
                  placeholder="Email"
                  required
                />
                <input
                  className={styles.textInputs}
                  type="password"
                  id={styles.password}
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div id={styles.buttonContainer}>
                <button id={styles.signUp} onClick={getFormInputs}>
                  Sign-In
                </button>
                <a href="http://localhost:3000/signup" id={styles.signIn}>
                  Don't have an Account?
                </a>
              </div>
            </div>
          ) : (
            <div id={styles.responseOk}>
              <div id={styles.responseMessage}>
                {responseSuccess ? (
                  <div>
                    {responseMessage}
                  </div>
                ) : (
                  <div>
                    <span>
                      {responseMessage}
                    </span>
                    <a href='http://localhost:3000/signin'>
                      Try Again
                    </a>
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
