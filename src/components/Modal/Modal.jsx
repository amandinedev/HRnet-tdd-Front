import React, { useEffect } from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

const Modal = ({ show, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent} data-testid="success-modal">
        <p data-testid="modal-message">Employee has been successfully added!</p>
        <Button onClick={onClose} data-testid="modal-close-button">Close</Button>
      </div>
    </div>
  );
};

export default Modal;