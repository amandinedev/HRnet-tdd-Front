import React from "react";
import { Link } from "react-router-dom";
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import Button from "../../components/Button/Button";
import styles from "./HomePage.module.scss";

const Home = () => {
  return (
    <main className={styles.homeContainer}>
      <div>
        <h1>HRnet</h1>
        <Link to="/employee-list" tabIndex={0} className={styles.linkButton}>View Current Employees</Link>
        <h2>Create Employee</h2>
      </div>
      <EmployeeForm />
    </main>
  );
};

export default Home;
