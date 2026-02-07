import React from "react";
import Button from "../Button/Button";
import styles from "./Modal.module.scss";

const Modal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>Employee has been successfully added!</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default Modal;