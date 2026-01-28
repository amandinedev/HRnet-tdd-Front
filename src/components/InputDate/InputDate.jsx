// InputDate.jsx
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./InputDate.module.scss";

const InputDate = ({ 
  label, 
  dateValue, 
  handleChange, 
  submitted, 
  className = "",
  required = false,
  ...props 
}) => {
  const isError = dateValue === null;

  return (
    <div className={`${styles['df-input-date-container']} ${className}`}>
      {label && (
        <label 
          className={`${styles['df-input-date-label']} ${required ? styles.required : ''}`} 
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <DatePicker
        className={isError && submitted ? 'error' : ''}
        id={label}
        selected={dateValue}
        onChange={handleChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
        wrapperClassName={styles['df-datepicker-wrapper']}
        {...props}
      />
      {submitted && isError && (
        <p className={styles['df-input-date-error']}>
          Please select a date
        </p>
      )}
    </div>
  );
};

export default InputDate;