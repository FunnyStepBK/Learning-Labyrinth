import React, { useState, useEffect, useRef } from 'react';
import styles from '../Styles/sign-up.module.css';
import sendFormData  from './utils/sendFormData'

export default function SignUp() {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('User');
  const [selectedCountry, setSelectedCountry] = useState('India');
  const [responseMessage, setResponseMessage] = useState('');
  const [responseStatus, setResponseStatus] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState(false);

  const roleDropdownRef = useRef(null);
  const countryDropdownRef = useRef(null);

  useEffect(() => {
    /**
     * Close dropdowns when clicking outside
     */
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

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up the event listener on component unmount
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
    const formData = {
      username: document.querySelector(`#${styles.name}`)?.value,
      email: document.querySelector(`#${styles.email}`)?.value,
      password: document.querySelector(`#${styles.password}`)?.value,
      phone: document.querySelector(`#${styles.phone}`)?.value,
      role: selectedRole === "User" ? "user" : "businessOwner", 
      region: selectedCountry,
    }

    try {
      const response = await sendFormData(formData, 'login');
      setResponseMessage(`Successfully logged in as ${response.username}`);
      setResponseStatus(true);
      setResponseSuccess(true);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred';
      const errorCode = error.response?.data?.errorCode || 'Unknown error code';
      setResponseMessage(`${errorCode}: ${errorMessage}`);
      setResponseStatus(true);
      setResponseSuccess(false);
    }
  }

  const toggleRoleDropdown = () => {
    setRoleDropdownOpen(!roleDropdownOpen);
  };

  const toggleCountryDropdown = () => {
    setCountryDropdownOpen(!countryDropdownOpen);
  };

  return (
    <div id={styles.container}>
      <div id={styles.cardContainer}>
        <div id={styles.form}>
          <div id={styles.textFields}>
            <input
              className={styles.textInputs}
              type="text"
              id={styles.name}
              name="name"
              placeholder="Name"
              required
            />
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

          <div id={styles.dropdownFields}>
            <div
              ref={roleDropdownRef}
              id={styles.roles}
              className={`${styles.dropdown} ${
                roleDropdownOpen ? styles.menuOpen : ''
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
              <ul
                className={`${styles.menu} ${roleDropdownOpen ? styles.menuOpen : ''}`}
              >
                <li
                  className={selectedRole === 'User' ? styles.active : ''}
                  onClick={() => handleRoleSelect('User')}
                >
                  User
                </li>
                <li
                  className={
                    selectedRole === 'Business Owner' ? styles.active : ''
                  }
                  onClick={() => handleRoleSelect('Business Owner')}
                >
                  Business Owner
                </li>
              </ul>
            </div>

            <div
              ref={countryDropdownRef}
              id={styles.countries}
              className={`${styles.dropdown} ${
                countryDropdownOpen ? styles.menuOpen : ''
              }`}
            >
              <div className={styles.select} onClick={toggleCountryDropdown}>
                <span className={styles.selected}>{selectedCountry}</span>
                <div className={`${styles.caret} ${countryDropdownOpen ? styles.caretRotate : ''}`}>
                  <span className={`material-symbols-outlined `}>
                    arrow_right
                  </span>
                </div>
              </div>
              <ul
                className={`${styles.menu} ${countryDropdownOpen ? styles.menuOpen : ''}`}
              >
                <li
                  className={selectedCountry === 'India' ? styles.active : ''}
                  onClick={() => handleCountrySelect('India')}
                >
                  India
                </li>
                <li
                  className={selectedCountry === 'France' ? styles.active : ''}
                  onClick={() => handleCountrySelect('France')}
                >
                  France
                </li>
                <li
                  className={selectedCountry === 'Brazil' ? styles.active : ''}
                  onClick={() => handleCountrySelect('Brazil')}
                >
                  Brazil
                </li>
                <li
                  className={selectedCountry === 'Russia' ? styles.active : ''}
                  onClick={() => handleCountrySelect('Russia')}
                >
                  Russia
                </li>
                <li
                  className={selectedCountry === 'China' ? styles.active : ''}
                  onClick={() => handleCountrySelect('China')}
                >
                  China
                </li>
                <li
                  className={
                    selectedCountry === 'Australia' ? styles.active : ''
                  }
                  onClick={() => handleCountrySelect('Australia')}
                >
                  Australia
                </li>
              </ul>
            </div>
          </div>

          <div id={styles.numberField}>
            <input
              type="tel"
              id={styles.phone}
              name="phone"
              placeholder="Phone +"
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
      </div>
    </div>
  );
}
