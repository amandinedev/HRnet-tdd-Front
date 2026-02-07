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
  id,
  ...props 
}) => {
  const isError = submitted && dateValue === null;

  return (
    <div className={`${styles['df-input-date-container']} ${className}`}>
      {label && (
        <label 
          className={`${styles['df-input-date-label']} ${required ? styles.required : ''}`} 
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <DatePicker
        id={id}
        selected={dateValue}
        onChange={handleChange}
        dateFormat="MM/dd/yyyy"
        placeholderText="Select a date"
        className={isError ? styles['df-input-error'] : ''}
        wrapperClassName={styles['df-datepicker-wrapper']}
        {...props}
      />
      {isError && (
        <p className={styles['df-input-date-error']}>
          Please select a date
        </p>
      )}
    </div>
  );
};

export default InputDate;