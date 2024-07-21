import React, { useState, useEffect } from 'react';
import styles from '../Styles/landing.module.css';
import isLoggedIn from './utils/checkLogin';
import returnHomeURL from './utils/HomeURL';

export default function Home() {
  const homeUrl = returnHomeURL();
  
  useEffect(() => {
    const checkLogin = async () => {
      const authenticated = await isLoggedIn();
      if (authenticated) {
        window.location.href = `${homeUrl}/home`;
      }
    };

    checkLogin();
  }, [])
  
  return (
    <div id={styles.page}>
      <h1>
        About Us
      </h1>
    </div>
  )
}