import React from "react";
import { useLocation } from "react-router-dom";
import "./LoginFailurePage.css"; // Import the CSS file

const FailurePage = () => {
  const location = useLocation();
  const message = location.state?.message || "Invalid UserName or Password";

  return (
    <div className="failure-container">
      <h2 className="failure-title">Failed</h2>
      <p className="failure-message">{message}</p>
      <button
        className="failure-button"
        onClick={() => (window.location.href = "/")}
      >
        Try Again
      </button>
    </div>
  );
};

export default FailurePage;
