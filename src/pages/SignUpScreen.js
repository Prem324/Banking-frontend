import React, { useState } from "react";
import "./SignUpScreenStyling.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "", // ✅ Updated key
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://banking-backend-785j.onrender.com/api/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json(); // ✅ Parse JSON

      if (response.status === 200) {
        navigate("/success");
      } else {
        navigate("/failure", { state: { message: data.message } });
      }
    } catch (error) {
      console.error("Error:", error);
      navigate("/failure", {
        state: { message: "Network error, please try again." },
      });
    }
  };

  return (
    <div className="signup-container">
      <h2 className="header"> Sign Up</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Username", name: "username", type: "text" },
          { label: "Password", name: "password", type: "password" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" }, // ✅ Key changed
          { label: "City", name: "city", type: "text" },
          { label: "State", name: "state", type: "text" },
          { label: "Country", name: "country", type: "text" },
          { label: "Pincode", name: "pincode", type: "text" },
        ].map(({ label, name, type }) => (
          <div className="input-group" key={name}>
            <label htmlFor={name} className="input-label">
              {label}
            </label>
            <input
              type={type}
              name={name}
              id={name}
              value={formData[name]}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
