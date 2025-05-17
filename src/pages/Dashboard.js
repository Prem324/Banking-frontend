import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import "./Dashboard.css";
import Loader from "./Loader";
// import { errorStyle } from "./utils";

const Dashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const userName = localStorage.getItem("userName")
          ? JSON.parse(localStorage.getItem("userName"))
          : undefined;
        const token = localStorage.getItem("token");
        const response = await fetch(
          `https://banking-backend-785j.onrender.com/getAllAccountsOfUser/${userName}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        if (response.ok && Array.isArray(data.accounts)) {
          setAccounts(data.accounts);
          setError(null);
        } else {
          setAccounts([]);
          setError(data.message || "Failed to fetch accounts.");
        }
      } catch (error) {
        setAccounts([]);
        setError("Network error, please try again.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchAccounts();
  }, []);

  const handleViewDetails = (accountNumber) => {
    navigate(`/accountSummary/${accountNumber}`);
  };

  const handleQuickLinkClick = (action) => {
    if (action === 1) {
      navigate("/createAccount");
    }
    if (action === 2) {
      navigate("/transfer");
    }
    // Handle quick link actions
    console.log(`${action} clicked`);
  };

  // if (loading) return <div>Loading accounts...</div>;
  // if (error) return <div>Error fetching accounts: {error}</div>;

  return (
    <div className="container">
      <Sidebar className="sidebar" />
      <div className="dashboard">
        {loading ? (
          <Loader />
        ) : (
          <div className="content">
            {error && <div className="error">{error}</div>}
            {accounts.length === 0 && !error && (
              <div>No accounts available.</div>
            )}
            {accounts.length > 0 && (
              <div className="accounts">
                <h1 style={{ textAlign: "center", color: "#3B536F" }}>
                  Accounts
                </h1>
                <div className="card-container">
                  {accounts.map((account) => (
                    <div className="card" key={account.accountNumber}>
                      <div className="card-content">
                        <div className="info">
                          <p>A/c No - {account.accountNumber}</p>
                          <p>A/c Type - {account.accountType}</p>
                          <p>
                            Balance:{" "}
                            <span style={{ fontSize: "18px", fontWeight: 600 }}>
                              ${account.currentBalance.toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <div>
                          <button
                            className="view-details-button"
                            onClick={() =>
                              handleViewDetails(account.accountNumber)
                            }
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="quick-links">
        <div className="quick-link-card">
          <div className="quick-link-card-content">
            <h2>Quick Links</h2>
            <div className="quick-link">
              <button onClick={() => handleQuickLinkClick(1)}>
                Apply for New Account
              </button>
            </div>
            <div className="quick-link">
              <button onClick={() => handleQuickLinkClick(2)}>
                Transfer Money
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
