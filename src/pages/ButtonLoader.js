// Loader.js
import React from "react";

const ButtonLoader = ({ size = 10, color = "#3498db" }) => {
  return (
    <div
      style={{
        border: `${size}px solid #f3f3f3`, // Light gray
        borderTop: `${size}px solid ${color}`, // Spinner color
        borderRadius: "50%",
        width: `${size * 2}px`, // Spinner size
        height: `${size * 2}px`, // Spinner size
        animation: "spin 1s linear infinite",
      }}
    ></div>
  );
};

export default ButtonLoader;
