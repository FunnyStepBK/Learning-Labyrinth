import React, { useState, useRef, useEffect } from 'react';
import styles from '../Styles/register-auth.module.css';
import sendFormData from './utils/sendFormData';
import { useNavigate } from 'react-router-dom';
import isLoggedIn from './utils/checkLogin';

export default function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
  });

  const [selectedRole, setSelectedRole] = useState('Student');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState(false);
  const [responseCode, setResponseCode] = useState('');
  const [invalidInputs, setInvalidInputs] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false); 
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      const authenticated = await isLoggedIn();
      setIsAuthenticated(authenticated);
      if (authenticated) {
        setTimeout(() => {
          window.location.href = 'http://localhost:3000/home'
        }, 4000);
      }
    };

    checkLogin();
  }, [navigate]);

  const roleDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);
  const roleOptions = ['Student', 'College Student', 'Teacher', 'Working Professional'];
  const countryOptions = ['India', 'France', 'Brazil', 'Russia', 'China', 'Australia']; 

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target)
      ) {
        setRoleDropdownOpen(false);
      }
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setCountryDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setRoleDropdownOpen(false);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setCountryDropdownOpen(false);
  };

  const getFormInputs = async () => {
    const formDataToSend = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: selectedRole === "Student" ? "student" : "working professional",
      region: selectedCountry,
    };

    const findInvalidFields = (data) => {
      const invalidFields = [];
      Object.keys(data).forEach((key) => {
        if (!data[key]) {
          invalidFields.push(key);
        }
      });
      return invalidFields;
    };

    const invalidFields = findInvalidFields(formDataToSend);
    setInvalidInputs(invalidFields);

    if (invalidFields.length > 0) {
      return;
    }

    try {
      const response = await sendFormData(formDataToSend, 'register');
      setResponseMessage(`User ${response.username} created successfully.`);
      setResponseStatus(true);
      setResponseSuccess(true);
      localStorage.setItem('accessToken', response.accessToken);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      const errorCode = error.response?.data?.errorCode || 'Unknown error code';
      setResponseMessage(`Error code: ${errorCode}: ${errorMessage}`);
      setResponseCode(errorCode);
      setResponseStatus(true);
      setResponseSuccess(false);
    }
  };

  const toggleRoleDropdown = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
  };

  const toggleCountryDropdown = () => {
    setCountryDropdownOpen(!countryDropdownOpen);
  };

  return (
    <div id={styles.container}>
      <div id={styles.cardContainer}>
        {isAuthenticated ? (
          <div>
            <h1>All Set</h1>
            Your are Logged In!
            <a href='http://localhost:3000/home'>Go to Home page.</a>
          </div>
        ) : (
          !responseStatus ? (
            <div id={styles.form}>
              <div id={styles.textFields}>
                <input
                  className={`${styles.textInputs} ${invalidInputs.includes('name') ? styles.emptyInputs : ''
                    }`}
                  type="text"
                  id={styles.name}
                  name="name"
                  placeholder="Name"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
                <input
                  className={`${styles.textInputs} ${invalidInputs.includes('email') ? styles.emptyInputs : ''
                    }`}
                  type="email"
                  id={styles.email}
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
                <input
                  className={`${styles.textInputs} ${invalidInputs.includes('password') ? styles.emptyInputs : ''
                    }`}
                  type="password"
                  id={styles.password}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>

              <div id={styles.dropdownFields}>
                <div
                  ref={roleDropdownRef}
                  id={styles.roles}
                  className={`${styles.dropdown} ${roleDropdownOpen ? styles.menuOpen : ''
                    }`}
                >
                  <div className={styles.select} onClick={toggleRoleDropdown}>
                    <span className={styles.selected}>{selectedRole}</span>
                    <div className={`${styles.caret} ${roleDropdownOpen ? styles.caretRotate : ''}`}>
                      <span className={`material-symbols-outlined`}>
                        arrow_right
                      </span>
                    </div>
                  </div>
                  <ul className={`${styles.menu} ${roleDropdownOpen ? styles.menuOpen : ''}`}>
                    {roleOptions.map((role, index) => (
                      <li
                        key={index}
                        className={selectedRole === role ? styles.active : ''}
                        onClick={() => handleRoleSelect(role)}
                      >
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  ref={countryDropdownRef}
                  id={styles.countries}
                  className={`${styles.dropdown} ${countryDropdownOpen ? styles.menuOpen : ''
                    }`}
                >
                  <div className={styles.select} onClick={toggleCountryDropdown}>
                    <span className={styles.selected}>{selectedCountry}</span>
                    <div className={`${styles.caret} ${countryDropdownOpen ? styles.caretRotate : ''}`}>
                      <span className={`material-symbols-outlined`}>
                        arrow_right
                      </span>
                    </div>
                  </div>
                  <ul className={`${styles.menu} ${countryDropdownOpen ? styles.menuOpen : ''}`}>
                    {countryOptions.map((country, index) => (
                      <li
                        key={index}
                        className={selectedCountry === country ? styles.active : ''}
                        onClick={() => handleCountrySelect(country)}
                      >
                        {country}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div id={styles.numberField}>
                <input
                  type="tel"
                  className={`${styles.textInputs} ${invalidInputs.includes('phone') ? styles.emptyInputs : ''
                    }`}
                  id={styles.phone}
                  name="phone"
                  placeholder="Phone +"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div id={styles.buttonContainer}>
                <button id={styles.signUp} onClick={getFormInputs}>
                  Sign-Up
                </button>
                <a href="http://localhost:3000/signin" id={styles.signIn}>
                  Sign-In?
                </a>
              </div>
            </div>
          ) : (
            <div id={styles.responseOk}>
              <div id={styles.responseMessage}>
                {responseSuccess ? (
                  <div>{responseMessage}</div>
                ) : (
                  <div>
                    {responseCode === '#1004' || responseCode === '#1006' ? (
                      <div>
                        <span>{responseMessage}</span>
                        <a href='http://localhost:3000/signin'>Already have an account?</a>
                        <a href='http://localhost:3000/signup'>Try again.</a>
                      </div>
                    ) : (
                      <div>
                        <span>{responseMessage}</span>
                        <a href='http://localhost:3000/signup'>Try again.</a>
                      </div>
                    )}
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
