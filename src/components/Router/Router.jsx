import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../../pages/HomePage/HomePage";
import EmployeeList from "../../pages/EmployeeListPage/EmployeeListPage";
import Error404 from "../../pages/Error404Page/Error404Page";

/**
 * AppRouter component - Configures the application's routing structure.
 * Sets up main routes for home, employee list, and a catch-all 404 page.
 */
const AppRouter = () => {
  // ===== RENDER =====
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