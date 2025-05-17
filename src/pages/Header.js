import React from "react";
import "./Header.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userName = localStorage.getItem("userName")
    ? JSON.parse(localStorage.getItem("userName"))
    : undefined;
  const navigate = useNavigate();
  return (
    <header className="header-container">
      <div className="logo">
        <h5 className="bank-name">PTJ Bank</h5>
      </div>
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href={userName ? "/Dashboard" : "/"}>Home</a>
          </li>
          <li>
            <a href="/footer">About</a>
          </li>
          <li>
            <a href="/footer">Services</a>
          </li>
          <li>
            <a href="/footer">Contact</a>
          </li>
          {userName && (
            <li>
              <p
                onClick={() => {
                  localStorage.removeItem("userName");
                  localStorage.removeItem("userData");
                  navigate("/");
                }}
              >
                Logout
              </p>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
