import { Link } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import styles from "./HomePage.module.scss";

/**
 * Home component - The landing page of the HRnet application.
 * Displays the main title, navigation to employee list, and the employee creation form.
 */
const Home = () => {
  // ===== RENDER =====
  return (
    <main className={styles.homeContainer}>
      <div>
        <h1>HRnet</h1>
        <Link to="/employee-list" tabIndex={0} className={styles.linkButton}>
          View Current Employees
        </Link>
        <h2>Create Employee</h2>
      </div>
      <EmployeeForm />
    </main>
  );
};

export default Home;
