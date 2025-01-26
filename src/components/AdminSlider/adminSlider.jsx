import { Link, useLocation } from "react-router-dom";
import "./adminSlider.css";
import LoanRequests from "../LoanRequst/loanRequestFrom";

const AdminSidebar = ({ isSidebarOpen, setIsSidebarOpen, toggleSidebar }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const handleLogout = () => {
    // localStorage.removeItem("adminToken");
    // navigate("/admin/login");
  };

  return (
    <>
      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : "closed"}`}>
          <div className="admin-sidebar-content">
            <Link to="/admin/dashboard" className={`admin-sidebar-link ${currentPath === '/admin/dashboard' ? 'active' : ''}`}>
              <i className="fas fa-home"></i>
              <span>Dashboard</span>
            </Link>
            <Link to="/admin/loanrequest" className={`admin-sidebar-link ${currentPath === '/admin/loanrequest' ? 'active' : ''}`}>
              <i className="fas fa-users"></i>
              <span>Loan Request</span>
            </Link>
            <Link className={`admin-sidebar-link`} onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </Link>
          </div>
        </aside>
    </>
  );
};

export default AdminSidebar;
