import React from 'react';
import "./loanCard.css"

const LoanRequestCard = ({ loanRequest, onAccept }) => (
  <div className="loan-card">
    <h3 className="loan-title">Loan Request</h3>
    <p className="loan-detail"><strong>Loan Type:</strong> {loanRequest.type}</p>
    <p className="loan-detail"><strong>Amount:</strong> PKR {loanRequest.amount}</p>
    <p className="loan-detail"><strong>Duration:</strong> {loanRequest.duration} years</p>
    <button className="accept-btn" onClick={onAccept}>
      Accept
    </button>
  </div>
);

export default LoanRequestCard;
