// src/components/Sidebar.js
import React, { useEffect, useState } from "react";
import "./SideBar.css";
import Loader from "./Loader";
import { errorStyle } from "./utils";

function Sidebar() {
  const [user, setUser] = useState(
    localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData"))
      : null
  ); // Initialize user as null
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      const userName = localStorage.getItem("userName")
        ? JSON.parse(localStorage.getItem("userName"))
        : undefined;
      if (userName) {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `https://banking-backend-785j.onrender.com/getProfileInfoOfUser/${userName}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            }
          );

          if (response.ok) {
            const data = await response.json(); // Parse JSON response
            setTimeout(() => {
              setUser(data); // Set user state with fetched data
            }, 1000);
            localStorage.setItem("userData", JSON.stringify(data));
          } else {
            console.error("Error fetching user data:", response.statusText);
          }
        } catch (error) {
          console.error("Network error:", error);
        } finally {
          setTimeout(() => {
            setLoading(false); // Update loading state
          }, 1000);
        }
      } else {
        setLoading(false); // No userName found
      }
    };

    !user && fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user && !loading)
    return (
      <div className="sidebar" style={errorStyle}>
        No user info available.
      </div>
    ); // Handle case where user is not found

  return (
    <>
      <div className="sidebar">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2>User Information</h2>
            <div className="account-info-item">
              <span className="account-info-key">Name:</span>
              <span className="account-info-value">
                {user.name ? user.name.toUpperCase() : ""}
              </span>
            </div>
            <div className="account-info-item">
              <span className="account-info-key">UserName:</span>
              <span className="account-info-value">{user.username}</span>
            </div>
            <div className="account-info-item">
              <span className="account-info-key">Email:</span>
              <span className="account-info-value">{user.email}</span>
            </div>
            <div className="account-info-item">
              <span className="account-info-key">Phone:</span>
              <span className="account-info-value">{user.phoneNumber}</span>
            </div>
            <div className="account-info-item">
              <span className="account-info-key">City:</span>
              <span className="account-info-value">{user.city}</span>
            </div>
            <div className="account-info-item">
              <span className="account-info-key">State:</span>
              <span className="account-info-value">{user.state}</span>
            </div>
            <div className="account-info-item">
              <span className="account-info-key">Country:</span>
              <span className="account-info-value">{user.country}</span>
            </div>
            <div className="account-info-item">
              <span className="account-info-key">Pincode:</span>
              <span className="account-info-value">{user.pincode}</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Sidebar;
