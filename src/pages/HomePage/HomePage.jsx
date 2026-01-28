import React from "react";
import { Link } from 'react-router-dom';
import EmployeeForm from "../../components/EmployeeForm/EmployeeForm";
import styles from "./HomePage.module.scss";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
        <div>
      <h1>HRnet</h1>
      <Link to="/employee-list" tabIndex={0}>
        View Current Employees
      </Link>
      <h2>Create Employee</h2>
      </div>
      <EmployeeForm />
    </div>
  );
};

export default Home;
