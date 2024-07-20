import React, { useState } from 'react';
import styles from '../Styles/home.module.css'
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  
  return (
    <>
      <div>
        <div>
          <h1>
            Home
          </h1>
        </div>
      </div>
    </>
  )
}