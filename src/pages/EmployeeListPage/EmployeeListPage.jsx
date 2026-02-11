import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-paginated-datatable";
import "./EmployeeListPage.scss";

const EmployeeListPage = () => {
  const employeesSlice = useSelector((state) => state.employees);

  const employees = employeesSlice?.list || [];

  // Define columns for the table
  const employeeColumns = [
    {
      dataKey: "firstName",
      title: "First Name",
      sortable: true,
      searchable: true,
      width: "120px",
    },
    {
      dataKey: "lastName",
      title: "Last Name",
      sortable: true,
      searchable: true,
      width: "120px",
    },
    {
      dataKey: "startDate",
      title: "Start Date",
      sortable: true,
      width: "120px",
    },
    {
      dataKey: "department",
      title: "Department",
      sortable: true,
      searchable: true,
      width: "150px",
    },
    {
      dataKey: "dateOfBirth",
      title: "Date of Birth",
      sortable: true,
      width: "120px",
    },
    { dataKey: "street", title: "Street", sortable: true, width: "200px" },
    {
      dataKey: "city",
      title: "City",
      sortable: true,
      searchable: true,
      width: "120px",
    },
    { dataKey: "state", title: "State", sortable: true, width: "80px" },
    { dataKey: "zipCode", title: "Zip Code", sortable: true, width: "100px" },
  ];

  return (
    <main className="employee-list-container">
      <header className="page-header">
        <h1>Current Employees</h1>
        <p className="page-subtitle">
          View and manage all employees in the system
        </p>
      </header>

      <div className="table-container">
        <DataTable
          data={employees}
          columns={employeeColumns}
          itemsPerPage={10}
          searchable={true}
          sortable={true}
          pagination={true}
          striped={true}
          theme="light"
          className="employee-data-table"
          searchPlaceholder="employees by name..."
          emptyMessage={
            employees.length === 0
              ? "No employees added yet"
              : "No matching employees found"
          }
        />
      </div>
      <Link to="/" className="linkButton" tabIndex={0}>
        Home
      </Link>
    </main>
  );
};

export default EmployeeListPage;
