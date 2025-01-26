import React from "react";
import Login from "./pages/login";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import { ToastContainer, toast } from "react-toastify";
import ForgetPassword from "./pages/forgetPassword";
import ResetPassword from "./pages/resetPassword";
import { useDispatch } from "react-redux";
import LoanRequestFrom from "./components/LoanRequst/loanRequestFrom";
import HomePage from "./components/HomePage/homePage";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import LoanRequests from "./components/LoanRequst/loanRequestFrom";
import { useState } from "react";
import ChangePassword from "./pages/ChangePassword/changePass";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route
          path="/userDashboard"
          element={
            <UserDashboard
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin/loanrequest" element={<LoanRequests/>} />
      </Routes>
      <ToastContainer position="top-end" />
    </div>
  );
};

export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LandingPage from "./LandingPage";
// import RegistrationPage from "./RegistrationPage";
// import LoginPage from "./LoginPage";
// import LoanRequestForm from "./LoanRequestForm";
// import SlipGenerationPage from "./SlipGenerationPage";
// import UserDashboard from "./UserDashboard";
// import AdminDashboard from "./AdminDashboard";

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/register" element={<RegistrationPage />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/loan-request" element={<LoanRequestForm />} />
//         <Route path="/generate-slip" element={<SlipGenerationPage />} />
//         <Route path="/user-dashboard" element={<UserDashboard />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
