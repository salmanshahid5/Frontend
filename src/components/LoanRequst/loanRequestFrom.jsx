import React, { useState } from "react";
import LoanRequestCard from "../LoanCard/loanCard";
import AdminNavbar from "../AdminNavbar/adminNavbar";
import AdminSidebar from "../AdminSlider/adminSlider";
import UserDetail from "../UserDetail/detail";
import './loanRequestFrom.css'

const LoanRequests = () => {
    const [loanRequests] = useState([
      { type: "Wedding Loan", amount: 500000, duration: 3 },
      { type: "Home Construction Loan", amount: 1000000, duration: 5 },
      { type: "Home Construction Loan", amount: 1000000, duration: 5 },
      { type: "Home Construction Loan", amount: 1000000, duration: 5 },
    ]);
    const [showPopup, setShowPopup] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
    const handleAccept = () => {
      setShowPopup(true);
    };
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    return (
      <div className="admin-dashboard-container">
        {/* Navbar */}
        <AdminNavbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
  
        {/* Sidebar and Main Content */}
        <div className="admin-dashboard-content">
          <AdminSidebar isSidebarOpen={isSidebarOpen} />
  
          {/* Main Content */}
          <main className={`admin-main-content ${isSidebarOpen ? "" : "expanded"}`}>
            <div className="loan-requests-container">
              <h2 className="page-title">Loan Requests</h2>
              <div className="loan-request-cards">
                {loanRequests.map((request, index) => (
                  <LoanRequestCard key={index} loanRequest={request} onAccept={handleAccept} />
                ))}
              </div>
              {showPopup && <UserDetail onClose={() => setShowPopup(false)} />}
            </div>
          </main>
        </div>
      </div>
    );
};

export default LoanRequests;
