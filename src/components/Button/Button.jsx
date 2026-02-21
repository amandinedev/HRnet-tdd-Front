import PropTypes from "prop-types";
import styles from "./Button.module.scss";

/**
 * Button component - A reusable button with support for different types,
 * navigation, custom styling, and test IDs.
 */
const Button = ({
  type,
  to,
  children,
  onClick,
  disabled,
  className = styles.greenButton,
  "data-testid": testId,
  ...props
}) => {
  // ===== DERIVED VALUES =====
  const generatedTestId =
    testId || `button-${String(children).toLowerCase().replace(/\s+/g, "-")}`;

  // ===== RENDER =====
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      disabled={disabled}
      className={className}
      data-testid={generatedTestId}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  to: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  "data-testid": PropTypes.string,
};

export default Button;
