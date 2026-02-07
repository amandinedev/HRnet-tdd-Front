// Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Button.module.scss";

const Button = ({ type, to, children, onClick, disabled, className = styles.greenButton }) => {

  
  // If it's a regular button
  return (
    <button 
      type={type || 'button'} 
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {children}
    </button>
  );
};

export default Button;