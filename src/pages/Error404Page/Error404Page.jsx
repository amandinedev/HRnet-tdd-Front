import React from "react";
import styles from "./Error404Page.module.scss";

const Error404 = () => {
  return (
    <div className={styles.errorContainer}>
      <h1>
        Error 404 <br></br> Page Not Found
      </h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default Error404;
