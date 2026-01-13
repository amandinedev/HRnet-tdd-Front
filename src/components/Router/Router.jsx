import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/HomePage/HomePage";
import EmployeeList from "../../pages/EmployeeListPage/EmployeeListPage";
import Error404 from "../../pages/Error404Page/Error404Page";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        {/* Catch-all for undefined routes */}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
