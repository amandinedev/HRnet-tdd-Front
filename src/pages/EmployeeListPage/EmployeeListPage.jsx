import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import DataTable from "react-paginated-datatable";
import "./EmployeeListPage.scss";

/**
 * EmployeeListPage component - Displays a paginated, searchable table of all employees.
 * Includes loading state, row selection, and navigation back to home.
 */
const EmployeeListPage = () => {
  // ===== REDUX STATE =====
  const employeesSlice = useSelector((state) => state.employees);

  // ===== COMPONENT STATE =====
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);

  // ===== DERIVED VALUES =====
  const employees = employeesSlice?.list || [];

  // ===== TABLE CONFIGURATION =====
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

  // ===== EFFECTS =====
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // ===== EVENT HANDLERS =====
  const handleRowClick = (row) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(row.id)
        ? prevSelected.filter((id) => id !== row.id)
        : [...prevSelected, row.id],
    );
  };

  // ===== RENDER =====
  return (
    <main className="employee-list-container">
      {/* Header Section */}
      <header className="page-header">
        <h1>Current Employees</h1>
        <p className="page-subtitle">
          View and manage all employees in the system
        </p>
      </header>

      {/* Data Table Section */}
      <div className="table-container">
        <DataTable
          data={employees}
          columns={employeeColumns}
          selectedRows={selectedRows}
          onRowClick={handleRowClick}
          itemsPerPage={10}
          searchable={true}
          searchMode="and"
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
          loading={isLoading}
        />
      </div>

      {/* Navigation Link */}
      <Link to="/" className="linkButton" tabIndex={0}>
        Home
      </Link>
    </main>
  );
};

export default EmployeeListPage;
