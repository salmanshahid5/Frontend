import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './detail.css'

const UserDetail = ({ onClose }) => {
  const [guarantees, setGuarantees] = useState([
    { name: "", email: "", location: "", cnic: "", phone: "" },
    { name: "", email: "", location: "", cnic: "", phone: "" },
  ]);

  const handleChange = (index, field, value) => {
    const updatedGuarantees = [...guarantees];
    updatedGuarantees[index][field] = value;
    setGuarantees(updatedGuarantees);
  };

  const handleSubmit = () => {
    if (guarantees.every(g => g.name && g.email && g.location && g.cnic && g.phone)) {
      toast.success("Users details submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      onClose();
    } else {
      toast.error("Please fill out all guarantee details.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">Users Details</h2>
        <div className="modal-form">
          {guarantees.map((guarantee, index) => (
            <div key={index} className="form-group">
              <h3>Guarantee {index + 1}</h3>
              <div>
                <label>Name</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter name"
                  value={guarantee.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="Enter email"
                  value={guarantee.email}
                  onChange={(e) => handleChange(index, "email", e.target.value)}
                />
              </div>
              <div>
                <label>Location</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter location"
                  value={guarantee.location}
                  onChange={(e) => handleChange(index, "location", e.target.value)}
                />
              </div>
              <div>
                <label>CNIC</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter CNIC"
                  value={guarantee.cnic}
                  onChange={(e) => handleChange(index, "cnic", e.target.value)}
                />
              </div>
              <div>
                <label>Phone</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter phone number"
                  value={guarantee.phone}
                  onChange={(e) => handleChange(index, "phone", e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
