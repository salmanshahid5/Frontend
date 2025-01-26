import React, { useState } from "react";
import axios from "axios";
import { FORGET_PASSWORD } from "../config/apiConfig.js";
import "../styles/ForgetPassword.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(FORGET_PASSWORD, { email });
      setMessage(response.data.message);
       toast.success(response.data.message || "Reset link sent successfully!")
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
       toast.error(err.response?.data?.message || "Something went wrong")
      setMessage("");
    }
  };

  return (
    <div className="forget-password-main">
      <div className="forget-password-container">
        <h2>Forgot Password</h2>
        <p>Enter your registered email to receive a reset link.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send Reset Link</button>
          <p>
            Remembered your password?{" "}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </form>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
};

export default ForgetPassword;
