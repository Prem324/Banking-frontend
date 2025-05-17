// src/components/AccountList.js
import React from "react";
import AccountCard from "./AccountCard";
import "../styles/AccountList.css";

const AccountList = ({ accounts }) => {
  return (
    <div className="account-list">
      <h2>My Accounts</h2>
      {accounts.map((account, index) => (
        <AccountCard key={index} account={account} />
      ))}
    </div>
  );
};

export default AccountList;
