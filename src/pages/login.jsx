import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../redux/userSlice.js';
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { loading } = useSelector((state) => state.user); // Access loading state
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Please fill in both fields.');
      return;
    }

    dispatch(loginStart()); // Set loading to true
    try {
      const response = await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem('UserToken', (response.data.token));

      setTimeout(()=>{
        dispatch(loginSuccess(response.data)); // Set user data
        navigate('/change-password')
      },4000)

      toast.success(response.data.message); // Display success message
      setEmail('');
      setPassword('');
    } catch (error) {
      dispatch(loginFailure()); // Set error state
      setErrorMessage(error.response?.data?.message || 'An error occurred.');
      toast.error(error.response?.data?.message); // Display error message
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="form-field">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="form-field">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div >

          {/* Error Message */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291a7.962 7.962 0 01-2-5.291H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              'Login'
            )}
          </button>

          <div className="forgot-password-link">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

        </form>

        <div className="signup-link">
          <p>Don't have an account?{' '}
            <Link to="/">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
