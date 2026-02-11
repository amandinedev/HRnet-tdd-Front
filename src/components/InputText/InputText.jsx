import React from "react";
import { toCamelCase } from "../../utils/utils";
import styles from "./InputText.module.scss";

const InputText = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  submitted,
  required = false,
  className = "",
  error = "",
  ...props
}) => {
  const isError =
    error !== "" || (required && submitted && (!value || value.trim() === ""));
  const formattedId = toCamelCase(label);

  return (
    <div className={`${styles["df-input-text-container"]} ${className}`}>
      <label
        className={`${styles["df-input-text-label"]} ${required ? styles.required : ""}`}
        htmlFor={formattedId}
      >
        {label}
      </label>
      <input
        className={`${styles["df-input-text-field"]} ${isError ? styles.error : ""}`}
        type={type}
        id={formattedId}
        name={name}
        value={value}
        onChange={onChange}
        data-testid={`input-${formattedId}`}
        {...props}
      />

      {isError && (
        <p
          className={styles["df-input-text-error"]}
          data-testid={`error-${name}`} // Add this
        >
          {error || "Please fill in this field"}
        </p>
      )}
    </div>
  );
};

export default InputText;
