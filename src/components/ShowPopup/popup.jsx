import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signupSuccess, signupFailure, signupStart } from "@/redux/userSlice";

const ShowPopup = ({ onClose }) => {
  const [Cnic, setCnic] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for button disabling
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (Cnic && email) {
      setLoading(true); // Disable button on submit
      try {
        const response = await axios.post("http://localhost:5000/api/user/signup", {
          Cnic,
          email,
        });
        console.log(response.data);
        toast.success(response.data.message || "User registered successfully!");
        alert(response.data.message);
        dispatch(signupSuccess(response.data));
        localStorage.setItem('UserToken', response.data.token);
        onClose();
      } catch (error) {
        console.error(error); // Log the error for better debugging
        if (error.response) {
          toast.error(error.response.data.message || "An error occurred.");
          dispatch(signupFailure());
        } else {
          toast.error("Unable to connect to the server.");
        }
      } finally {
        setLoading(false); // Re-enable the submit button
      }
    } else {
      toast.error("Please provide both CNIC and email.");
    }
  };

  return (
    <div className="popup-overlay">
      <ToastContainer />
      <div className="popup-content">
        <h2 className="popup-title">Proceed to Application</h2>
        <div className="popup-input-group">
          <label className="popup-label">CNIC</label>
          <input
            type="text"
            className="popup-input"
            placeholder="Enter your CNIC"
            value={Cnic}
            onChange={(e) => setCnic(e.target.value)}
          />
        </div>
        <div className="popup-input-group">
          <label className="popup-label">Email</label>
          <input
            type="email"
            className="popup-input"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="popup-footer">
          <button className="popup-button cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="popup-button submit-button"
            onClick={handleSubmit}
            disabled={loading} // Disable the button during loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowPopup;
