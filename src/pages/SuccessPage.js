import React from "react";
import "./SuccessPage.css"; // Import the CSS file

const SuccessPage = () => {
  return (
    <div className="success-container">
      <h2 className="success-title">Registration Successful!</h2>
      <p className="success-message">
        Your account has been created successfully.
      </p>
      <button
        className="success-button"
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </button>
    </div>
  );
};

export default SuccessPage;
