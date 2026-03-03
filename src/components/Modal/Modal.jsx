import { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

/**
 * Modal component - A reusable modal dialog with overlay, custom message close button,
 * and Escape key support.
 */
const Modal = ({ show, message, onClose }) => {
  // ===== EFFECTS =====
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [show, onClose]);

  // ===== EARLY RETURN =====
  if (!show) return null;

  // ===== RENDER =====
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} data-testid="success-modal">
        <button
          className={styles.modalClose}
          onClick={onClose}
          type="button"
          aria-label="Close modal"
        >
          ✕
        </button>
        <p data-testid="modal-message">{message}</p>
        <Button onClick={onClose} data-testid="modal-close-button">
          Close
        </Button>
      </div>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
