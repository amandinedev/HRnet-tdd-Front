import React from 'react';
import { Link } from 'react-router-dom';
import styles from "./Button.module.scss";

const Button = ({ 
  type, 
  to, 
  children, 
  onClick, 
  disabled, 
  className = styles.greenButton,
  'data-testid': testId, 
  ...props 
}) => {
  // Generate test ID from button text if not provided
  const generatedTestId = testId || `button-${String(children).toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <button 
      type={type || 'button'} 
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-testid={generatedTestId} 
      {...props} 
    >
      {children}
    </button>
  );
};

export default Button;