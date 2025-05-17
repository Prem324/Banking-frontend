import React from "react";
import "./Footer.css"; // Import CSS file

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <h1 className="footer-bank-name">PTJ Bank</h1>
        </div>
        <nav className="footer-nav">
          <ul className="footer-links">
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms">Terms of Service</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ABC Bank. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
