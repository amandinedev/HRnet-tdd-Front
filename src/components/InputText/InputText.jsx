// InputText.jsx
import React from "react";
import styles from "./InputText.module.scss";

const InputText = ({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  submitted,
  required = false,
  className = "",
  ...props
}) => {
  const isError = submitted && value === "";

  return (
    <div className={`${styles['df-input-text-container']} ${className}`}>
      <label 
        className={`${styles['df-input-text-label']} ${required ? styles.required : ''}`} 
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`${styles['df-input-text-field']} ${isError ? styles.error : ''}`}
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      {isError && (
        <p className={styles['df-input-text-error']}>
          Please fill in this field
        </p>
      )}
    </div>
  );
};

export default InputText;