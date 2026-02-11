import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toCamelCase } from "../../utils/utils";
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
  const isError = required && submitted && dateValue === null;
  const formattedId = toCamelCase(label);
  const testId = `input-${formattedId}`;

  return (
    <div 
      className={`${styles["df-input-date-container"]} ${className}`}
      data-testid={`container-${testId}`}
    >
      {label && (
        <label
          className={`${styles["df-input-date-label"]} ${required ? styles.required : ""}`}
          htmlFor={formattedId}
        >
          {label}
        </label>
      )}
      <div data-testid={testId}>
        <DatePicker
          id={formattedId}
          selected={dateValue}
          onChange={handleChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date"
          className={isError ? styles["df-input-error"] : ""}
          wrapperClassName={styles["df-datepicker-wrapper"]}
          {...props}
        />
      </div>
      {isError && (
        <p
          className={styles["df-input-date-error"]}
          data-testid={`error-${formattedId}`}
        >
          Please select a date
        </p>
      )}
    </div>
  );
};

export default InputDate;