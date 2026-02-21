import styles from "./Error404Page.module.scss";

/**
 * Error404 component - Displays a 404 error page when a route is not found.
 * Provides user-friendly message and visual feedback for invalid URLs.
 */
const Error404 = () => {
  // ===== RENDER =====
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
