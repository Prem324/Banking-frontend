import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignInPage.css";

const SignInPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    if (storedUser) {
      navigate("/Dashboard");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://banking-backend-785j.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json(); // Always parse JSON

      if (data.token) {
        localStorage.setItem("userName", JSON.stringify(username));
        localStorage.setItem("token", data.token);
        navigate("/Dashboard");
      } else {
        navigate("/failure", {
          state: { message: data.message || "Invalid login" },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/failure", {
        state: { message: "Network error, please try again." },
      });
    }
  };

  return (
    <div className="page-container">
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        <form onSubmit={handleSubmit} className="signin-form">
          <div className="input-group">
            <label htmlFor="username" className="input-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>
        <p className="signin-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
