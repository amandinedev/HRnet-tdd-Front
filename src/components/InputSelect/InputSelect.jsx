import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { toCamelCase } from "../../utils/utils";
import styles from "./InputSelect.module.scss";

/**
 * InputSelect component - A custom accessible select dropdown with keyboard navigation,
 * focus management, and error handling.
 */
const InputSelect = ({
  data,
  label,
  selectedValue,
  handleChange,
  submitted,
  required = false,
  className = "",
  disabled = false,
  placeholder = "Select an option",
  ...props
}) => {
  // ===== STATE & REFS =====
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const triggerRef = useRef(null);
  const optionsRef = useRef([]);

  // ===== DERIVED VALUES =====
  const isError = required && submitted && !selectedValue;
  const formattedId = toCamelCase(label);
  const isPlaceholder = !selectedValue;

  // ===== HELPER FUNCTIONS =====
  const getSelectedLabel = () => {
    if (!selectedValue) return placeholder;
    const selectedItem = data.find(
      (item) => item.name === selectedValue || item.value === selectedValue,
    );
    return selectedItem?.label || selectedItem?.name || placeholder;
  };

  const moveFocus = (direction) => {
    const currentIndex = optionsRef.current.findIndex(
      (option) => option === document.activeElement,
    );

    let nextIndex;
    if (currentIndex === -1) {
      nextIndex = direction > 0 ? 0 : optionsRef.current.length - 1;
    } else {
      nextIndex = currentIndex + direction;
      if (nextIndex < 0) nextIndex = optionsRef.current.length - 1;
      if (nextIndex >= optionsRef.current.length) nextIndex = 0;
    }

    optionsRef.current[nextIndex]?.focus();
  };

  // ===== EVENT HANDLERS =====
  const handleTriggerClick = () => {
    if (!disabled) setIsOpen(!isOpen);
  };

  const handleOptionClick = (value) => {
    if (!disabled && handleChange) {
      handleChange(value);
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  const handleTriggerKeyDown = (event) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else if (event.key === "ArrowDown") {
          moveFocus(1);
        } else if (event.key === "ArrowUp") {
          moveFocus(-1);
        }
        break;

      case "Tab":
        if (isOpen) setIsOpen(false);
        break;

      default:
        break;
    }
  };

  const handleOptionKeyDown = (event, value) => {
    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        handleOptionClick(value);
        break;

      case "ArrowDown":
        event.preventDefault();
        moveFocus(1);
        break;

      case "ArrowUp":
        event.preventDefault();
        moveFocus(-1);
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;

      case "Tab":
        setIsOpen(false);
        break;

      default:
        break;
    }
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape" && isOpen) {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  };

  // ===== EFFECTS =====
  // Reset optionsRef when data changes
  useEffect(() => {
    optionsRef.current = optionsRef.current.slice(0, data.length);
  }, [data]);

  // Close dropdown when clicking outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    document.addEventListener("keydown", handleEscapeKey);
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen]);

  // Focus first option when opening
  useEffect(() => {
    if (isOpen && optionsRef.current[0]) {
      setTimeout(() => optionsRef.current[0]?.focus(), 0);
    }
  }, [isOpen]);

  // ===== CLASS NAME GENERATION =====
  const triggerClasses = [
    styles["df-input-select-trigger"],
    isOpen && styles["df-input-select-trigger--open"],
    disabled && styles["df-input-select-trigger--disabled"],
    isError && styles.error,
  ]
    .filter(Boolean)
    .join(" ");

  const valueClasses = [
    styles["df-input-select-value"],
    isPlaceholder && styles["df-input-select-placeholder"],
  ]
    .filter(Boolean)
    .join(" ");

  // ===== RENDER =====
  return (
    <div className={`${styles["df-input-select-container"]} ${className}`}>
      {/* Label */}
      {label && (
        <label
          className={`${styles["df-input-select-label"]} ${required ? styles.required : ""}`}
          htmlFor={formattedId}
        >
          {label}
        </label>
      )}

      {/* Select wrapper */}
      <div ref={wrapperRef} className={styles["df-input-select-wrapper"]}>
        {/* Trigger button */}
        <button
          ref={triggerRef}
          type="button"
          className={triggerClasses}
          onClick={handleTriggerClick}
          onKeyDown={handleTriggerKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={isError || undefined}
          id={formattedId}
          data-testid={`input-select-trigger-${formattedId}`}
          {...props}
        >
          <span className={valueClasses}>{getSelectedLabel()}</span>
          <span className={styles["df-input-select-arrow"]} aria-hidden="true">
            ▼
          </span>
        </button>

        {/* Options dropdown */}
        {isOpen && !disabled && (
          <div
            className={styles["df-input-select-options"]}
            role="listbox"
            data-testid={`input-select-options-${formattedId}`}
          >
            {data.map((item, index) => {
              const value = item.value || item.name;
              const label = item.label || item.name;
              const isSelected = selectedValue === value;

              return (
                <button
                  key={value}
                  ref={(el) => (optionsRef.current[index] = el)}
                  type="button"
                  className={`${styles["df-input-select-option"]} ${
                    isSelected ? styles["df-input-select-option--selected"] : ""
                  }`}
                  onClick={() => handleOptionClick(value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, value)}
                  role="option"
                  aria-selected={isSelected}
                  data-value={value}
                  tabIndex={-1}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Error message */}
      {isError && (
        <p
          className={styles["df-input-select-error"]}
          data-testid={`error-select-${formattedId}`}
          role="alert"
        >
          Please select an option
        </p>
      )}
    </div>
  );
};

InputSelect.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      label: PropTypes.string,
    }),
  ).isRequired,
  label: PropTypes.string.isRequired,
  selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleChange: PropTypes.func.isRequired,
  submitted: PropTypes.bool.isRequired,
  required: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
};

export default InputSelect;
