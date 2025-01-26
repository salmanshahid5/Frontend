import React from "react";
import "./adminNavbar.css";
import { useSelector } from "react-redux";

const AdminNavbar = ({ toggleSidebar, isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-left">
        <button className="admin-menu-btn" onClick={toggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h1>User Dashboard</h1>
      </div>
      <div className="admin-navbar-right">
        <span className="admin-name">{user?.branchName}</span>
      </div>
    </nav>
  );
};

export default AdminNavbar;
