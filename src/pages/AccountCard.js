// src/components/AccountCard.js
import React from "react";
import "../styles/AccountCard.css";

const AccountCard = ({ account }) => {
  return (
    <div className="account-card">
      <h3>{account.type}</h3>
      <p>
        <strong>Balance:</strong> ${account.balance.toLocaleString()}
      </p>
      <p>
        <strong>Account Number:</strong> {account.number}
      </p>
    </div>
  );
};

export default AccountCard;
