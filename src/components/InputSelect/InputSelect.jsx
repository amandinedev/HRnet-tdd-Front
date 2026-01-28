// InputSelect.jsx
import React from 'react';
import styles from './InputSelect.module.scss';

const InputSelect = ({ 
  data, 
  label, 
  selectedValue, 
  handleChange, 
  submitted,
  required = false,
  className = "",
  ...props 
}) => {
  const isError = submitted && selectedValue === '';

  return (
    <div className={`${styles['df-input-select-container']} ${className}`}>
      {label && (
        <label 
          className={`${styles['df-input-select-label']} ${required ? styles.required : ''}`} 
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <select
        className={`${styles['df-input-select-field']} ${isError ? styles.error : ''}`}
        onChange={(e) => handleChange(e.target.value)}
        value={selectedValue}
        id={label}
        name={label}
        {...props}
      >
        <option value="">Select an option</option>
        {data.map((item) => (
          <option key={item.name} value={item.name}>
            {item.name}
          </option>
        ))}
      </select>
      {isError && (
        <p className={styles['df-input-select-error']}>
          Please select an option
        </p>
      )}
    </div>
  );
};

export default InputSelect;