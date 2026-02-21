import PropTypes from "prop-types";
import { toCamelCase } from "../../utils/utils";
import styles from "./InputText.module.scss";

/**
 * InputText component - A reusable text input field with label,
 * error handling, and validation support.
 */
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
  // ===== DERIVED VALUES =====
  const isError =
    error !== "" || (required && submitted && (!value || value.trim() === ""));
  const formattedId = toCamelCase(label);

  // ===== RENDER =====
  return (
    <div className={`${styles["df-input-text-container"]} ${className}`}>
      {/* Label */}
      <label
        className={`${styles["df-input-text-label"]} ${required ? styles.required : ""}`}
        htmlFor={formattedId}
      >
        {label}
      </label>

      {/* Input Field */}
      <input
        className={`${styles["df-input-text-field"]} ${isError ? styles.error : ""}`}
        type={type}
        id={formattedId}
        name={name}
        value={value}
        onChange={onChange}
        data-testid={`input-${formattedId}`}
        aria-invalid={isError || undefined}
        {...props}
      />

      {/* Error Message */}
      {isError && (
        <p
          className={styles["df-input-text-error"]}
          data-testid={`error-${name}`}
          role="alert"
        >
          {error || "Please fill in this field"}
        </p>
      )}
    </div>
  );
};

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.oneOf([
    "text",
    "email",
    "password",
    "number",
    "tel",
    "url",
    "search",
  ]),
  submitted: PropTypes.bool.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default InputText;
