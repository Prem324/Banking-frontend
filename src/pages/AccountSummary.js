import React, { useEffect, useState } from "react";
import "./AccountSummary.css"; // Import CSS for styling
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./BreadCrumb"; // Import Breadcrumb
import Sidebar from "./SideBar";
import Loader from "./Loader";
import { errorStyle } from "./utils";

const BankAccountSummary = () => {
  // Sample data for the bank account
  const [accountData, setAccountData] = useState({
    accountHolder: "John Doe",
    nominee: "Jane Doe",
    accountNumber: 152,
    accountType: "Savings",
    currentBalance: 98,
    branchName: 1009,
    placeOfBirth: null,
    dateOfBirth: null,
    phoneNumber: null,
    city: null,
    state: null,
    country: null,
    pincode: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  if (!id) {
    navigate("/Dashboard");
  }
  useEffect(() => {
    const fetchAccountAndUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        // Fetch account data
        const accountRes = await fetch(
          `https://banking-backend-785j.onrender.com/getAccount/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const accountData = await accountRes.json();

        // Fetch user data (using userName from account)
        let userData = null;
        if (accountData.account && accountData.account.userName) {
          const userRes = await fetch(
            `https://banking-backend-785j.onrender.com/getProfileInfoOfUser/${accountData.account.userName}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );
          userData = await userRes.json();
        }

        if (accountRes.ok && accountData.account) {
          setAccountData(accountData.account);
          setUserData(userData);
        } else {
          setError(accountData.message || "Failed to fetch account.");
        }
      } catch (error) {
        setError("Network error, please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAccountAndUserData();
  }, [id]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }

  return (
    <div className="container">
      <Sidebar />
      <div className="account-summary-container">
        <Breadcrumb path={"Account Summary"} /> {/* Add Breadcrumb here */}
        <div className="page-title-container">
          <h1 className="page-title">Account Summary</h1>
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <div className="account-summary-card">
            {loading ? (
              <Loader />
            ) : error ? (
              <div style={{ ...errorStyle, minHeight: "55vh" }}>
                Error: {error}
              </div>
            ) : (
              <>
                <div className="account-summary-left">
                  <div className="account-info-item">
                    <h3>
                      {" "}
                      {accountData.accountType} -{" "}
                      <span className="account-number">
                        {" "}
                        {accountData.accountNumber}{" "}
                      </span>
                    </h3>
                  </div>
                  <p className="balance-title"> Available Balance</p>
                  <h1 className="balance-value">
                    ${accountData.currentBalance}
                  </h1>
                  <p className="balance-info">
                    {" "}
                    (Account Balance + overdraft + Amount on Transaction)
                  </p>
                </div>
                <div className="account-summary-right">
                  {Object.entries({
                    "Account Holder": userData?.name,
                    Nominee: accountData.nominee,
                    "Account Number": accountData.accountNumber,
                    "Branch Name": accountData.branchName,
                    "Place of Birth": accountData.placeOfBirth || "N/A",
                    "Date of Birth": accountData.dateofbirth || "N/A",
                    Phone: accountData.phoneNumber || "N/A",
                    City: accountData.city || "N/A",
                    State: accountData.state || "N/A",
                    Country: accountData.country || "N/A",
                    Pincode: accountData.pincode || "N/A",
                  }).map(([key, value]) => (
                    <div className="account-info-item" key={key}>
                      <span className="account-info-key">{key}:</span>
                      <span className="account-info-value">{value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="quick-links-card">
            <h3>Quick Links</h3>
            <ul className="quick-links-list">
              <li>
                <a href="/CreateAccount" className="quick-link">
                  Apply for New Account
                </a>
              </li>
              <li>
                <a href="/transfer" className="quick-link">
                  Transfer Money
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankAccountSummary;
