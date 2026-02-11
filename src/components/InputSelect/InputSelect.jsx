import React, { useState, useRef, useEffect } from "react";
import { toCamelCase } from "../../utils/utils";
import styles from "./InputSelect.module.scss";

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
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const isError = required && submitted && selectedValue === "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (value) => {
    if (!disabled && handleChange) {
      handleChange(value);
      setIsOpen(false);
    }
  };

  // Find selected item for display
  const getSelectedLabel = () => {
    if (selectedValue === "") return placeholder;
    const selectedItem = data.find(
      (item) => item.name === selectedValue || item.value === selectedValue,
    );
    return selectedItem ? selectedItem.label || selectedItem.name : placeholder;
  };

  // Check if current value is placeholder
  const isPlaceholder = selectedValue === "";

  // Keyboard navigation
  const handleKeyDown = (event) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
      case "ArrowUp":
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      default:
        break;
    }
  };

  const triggerClasses = [
    styles["df-input-select-trigger"],
    isOpen ? styles["df-input-select-trigger--open"] : "",
    disabled ? styles["df-input-select-trigger--disabled"] : "",
    isError ? styles.error : "",
  ]
    .filter(Boolean)
    .join(" ");

  const valueClasses = [
    styles["df-input-select-value"],
    isPlaceholder ? styles["df-input-select-placeholder"] : "",
  ]
    .filter(Boolean)
    .join(" ");

  const formattedId = toCamelCase(label);

  return (
    <div className={`${styles["df-input-select-container"]} ${className}`}>
      {label && (
        <label
          className={`${styles["df-input-select-label"]} ${required ? styles.required : ""}`}
          htmlFor={formattedId}
        >
          {label}
        </label>
      )}

      <div ref={wrapperRef} className={styles["df-input-select-wrapper"]}>
        <button
          type="button"
          className={triggerClasses}
          onClick={handleTriggerClick}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={label}
          aria-invalid={isError}
          id={formattedId}
          data-testid={`input-select-trigger-${formattedId}`}
          {...props}
        >
          <span className={valueClasses}>{getSelectedLabel()}</span>
          <span className={styles["df-input-select-arrow"]} aria-hidden="true">
            ▼
          </span>
        </button>

        {isOpen && !disabled && (
          <div
            className={styles["df-input-select-options"]}
            role="listbox"
            aria-label={`${label} options`}
            data-testid={`input-select-options-${formattedId}`}
          >
            <button
              type="button"
              className={`${styles["df-input-select-option"]} ${isPlaceholder ? styles["df-input-select-option--selected"] : ""}`}
              onClick={() => handleOptionClick("")}
              role="option"
              aria-selected={isPlaceholder}
            >
              {placeholder}
            </button>
            {data.map((item) => {
              const value = item.value || item.name;
              const label = item.label || item.name;
              const isSelected = selectedValue === value;

              return (
                <button
                  key={value}
                  type="button"
                  className={`${styles["df-input-select-option"]} ${isSelected ? styles["df-input-select-option--selected"] : ""}`}
                  onClick={() => handleOptionClick(value)}
                  role="option"
                  aria-selected={isSelected}
                  data-value={value}
                >
                  {label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {isError && (
        <p
          className={styles["df-input-select-error"]}
          data-testid={`error-select-${formattedId}`} // Dynamic error test ID
        >
          Please select an option
        </p>
      )}
    </div>
  );
};

export default InputSelect;
