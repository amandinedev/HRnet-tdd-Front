import { useRef } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toCamelCase } from "../../utils/utils";
import styles from "./InputDate.module.scss";

/**
 * Custom footer component for the date picker with a Today button.
 */
const CustomFooter = ({ onChange, date, setCalendarDate }) => {
  // ===== EVENT HANDLERS =====
  const handleTodayClick = () => {
    const today = new Date();
    onChange(today);
    if (setCalendarDate) {
      setCalendarDate(today);
    }
  };

  // ===== RENDER =====
return (
  <div className={styles["df-custom-footer"]}>
    <button
      type="button"
      className={styles["df-today-button"]}
      onClick={handleTodayClick}
    >
      Today
    </button>
  </div>
);
};

CustomFooter.propTypes = {
  onChange: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date),
  setCalendarDate: PropTypes.func,
};

/**
 * InputDate component - A wrapper around react-datepicker with label, 
 * error handling, and custom footer.
 */
const InputDate = ({
  label,
  dateValue,
  handleChange,
  submitted,
  className = "",
  required = false,
  showYearDropdown = true,
  showMonthDropdown = true,
  dropdownMode = "scroll",
  ...props
}) => {
  // ===== REFS =====
  const datePickerRef = useRef(null);
  
  // ===== DERIVED VALUES =====
  const isError = required && submitted && dateValue === null;
  const formattedId = toCamelCase(label);
  const testId = `input-${formattedId}`;

  // ===== HELPER FUNCTIONS =====
  const setCalendarDate = (date) => {
    if (datePickerRef.current) {
      // Force calendar to update its internal date
      datePickerRef.current.setOpen(true);
      datePickerRef.current.setOpen(false);
      setTimeout(() => {
        datePickerRef.current.setOpen(true);
      }, 10);
    }
  };

  // ===== RENDER =====
  return (
    <div 
      className={`${styles["df-input-date-container"]} ${className}`}
      data-testid={`container-${testId}`}
    >
      {/* Label */}
      {label && (
        <label
          className={`${styles["df-input-date-label"]} ${required ? styles.required : ""}`}
          htmlFor={formattedId}
        >
          {label}
        </label>
      )}

      {/* Date Picker Input */}
      <div data-testid={testId}>
        <DatePicker
          ref={datePickerRef}
          id={formattedId}
          selected={dateValue}
          onChange={handleChange}
          dateFormat="MM/dd/yyyy"
          placeholderText="Select a date"
          className={isError ? styles["df-input-error"] : ""}
          wrapperClassName={styles["df-datepicker-wrapper"]}
          showYearDropdown={showYearDropdown}
          showMonthDropdown={showMonthDropdown}
          dropdownMode={dropdownMode} 
          yearDropdownItemNumber={100}
          scrollableYearDropdown={true}
          scrollableMonthDropdown={true} 
          {...props}
        >
          <CustomFooter 
            onChange={handleChange} 
            date={dateValue} 
            setCalendarDate={setCalendarDate}
          />
        </DatePicker>
      </div>

      {/* Error Message */}
      {isError && (
        <p
          className={styles["df-input-date-error"]}
          data-testid={`error-${formattedId}`}
          role="alert"
        >
          Please select a date
        </p>
      )}
    </div>
  );
};

InputDate.propTypes = {
  label: PropTypes.string.isRequired,
  dateValue: PropTypes.instanceOf(Date),
  handleChange: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  className: PropTypes.string,
  required: PropTypes.bool,
  showYearDropdown: PropTypes.bool,
  showMonthDropdown: PropTypes.bool,
  dropdownMode: PropTypes.oneOf(["scroll", "select"]),
};

export default InputDate;