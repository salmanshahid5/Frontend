import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams(); // URL se token mil raha hai
  console.log("Token from URL:", token);
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState(""); // Naye password ka state
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { newPassword });
      console.log("Response from server:", response);
      setMessage(response.data.message);
      setError("");
      setTimeout(() => navigate("/login"), 3000); // 3 seconds baad login page par redirect karenge
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
