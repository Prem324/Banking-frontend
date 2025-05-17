// Breadcrumb.js
import React from "react";
import { useNavigate } from "react-router-dom";

const Breadcrumb = ({ path }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.breadcrumb}>
      <span style={styles.link} onClick={() => navigate("/Dashboard")}>
        Dashboard
      </span>
      <span style={styles.separator}> &gt; </span>
      <span style={styles.current}>{path}</span>
    </div>
  );
};

const styles = {
  breadcrumb: {
    marginBottom: "20px",
    fontSize: "14px",
  },
  link: {
    color: "#007bff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  separator: {
    margin: "0 5px",
  },
  current: {
    fontWeight: "bold",
  },
};

export default Breadcrumb;
