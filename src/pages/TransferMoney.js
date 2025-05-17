import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./BreadCrumb";
import ButtonLoader from "./ButtonLoader";
import Modal from "react-modal";

Modal.setAppElement("#root");

const TransferMoneyScreen = () => {
  const [formData, setFormData] = useState({
    accountType: "Savings",
    selectedAccount: "",
    amount: "",
    beneficiaryAccountNumber: "",
  });

  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName")
    ? JSON.parse(localStorage.getItem("userName"))
    : undefined;

  useEffect(() => {
    // Fetch accounts from the API
    const fetchAccounts = async () => {
      try {
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
        if (Array.isArray(data.accounts)) {
          setAccounts(data.accounts);
          if (data.accounts.length > 0) {
            setFormData((prev) => ({
              ...prev,
              selectedAccount: data.accounts[0].accountNumber,
            }));
          }
        } else {
          setAccounts([]);
          // Optionally handle error here
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
        setAccounts([]);
      }
    };

    fetchAccounts();
  }, [userName]);

  useEffect(() => {
    // Filter accounts based on selected account type
    const filtered = accounts.filter(
      (account) => account.accountType === formData.accountType
    );
    setFilteredAccounts(filtered);
    if (filtered.length > 0) {
      setFormData((prev) => ({
        ...prev,
        selectedAccount: filtered[0].accountNumber,
      }));
    }
  }, [formData.accountType, accounts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Transfer Money Data:", formData);

    // Prepare data for POST request
    const transferData = {
      accountNumber: formData.selectedAccount,
      amount: parseFloat(formData.amount), // Ensure it's a number
      targetAccountNumber: formData.beneficiaryAccountNumber,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:8080/api/transfer/sendMoney",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(transferData),
        }
      );

      if (response.status === 200) {
        const data = await response;
        console.log("Transfer response:", data);
        setTimeout(() => {
          setLoading(false);
          setModalMessage("Transaction Successful");
          setModalIsOpen(true);
        }, 500);
        // alert('Transfer successful!');
        // navigate('/Dashboard'); // Redirect on success
      } else {
        setTimeout(async () => {
          const errorData = await response;
          setModalMessage("Transaction Failed. Please try again later.");
          setModalIsOpen(true);
          setLoading(false);
          console.log(errorData);
        }, 500);
      }
    } catch (error) {
      console.error("Transfer failed:", error);
      setModalMessage("Network error, please try again.");
      setModalIsOpen(true);
      setLoading(false);
    }
  };

  const closeModal = () => {
    navigate("/Dashboard");
    setModalIsOpen(false);
  };

  return (
    <div>
      <Breadcrumb path={"Transfer Money"} />
      <div style={styles.container}>
        <h2 style={styles.header}>Transfer Money</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Account Type:</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              style={styles.input}
            >
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Account:</label>
            <select
              name="selectedAccount"
              value={formData.selectedAccount}
              onChange={handleChange}
              style={styles.input}
              required
            >
              {filteredAccounts.map((account) => (
                <option
                  key={account.accountNumber}
                  value={account.accountNumber}
                >
                  {`Account Number: ${account.accountNumber} - Balance: ${account.currentBalance}`}
                </option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Amount:</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Beneficiary Account Number:</label>
            <input
              type="text"
              name="beneficiaryAccountNumber"
              value={formData.beneficiaryAccountNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.submitButton} disabled={loading}>
            {loading ? <ButtonLoader /> : "Transfer"}
          </button>
        </form>

        {/* Modal for success or failure message */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={modalStyles}
        >
          <h2>{modalMessage}</h2>
          <button onClick={closeModal} style={styles.modalButton}>
            Close
          </button>
        </Modal>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#FFFFFF",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#3B536F",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  inputGroup: {
    marginBottom: "15px",
    width: "100%",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#333333",
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#f7f7f7",
  },
  submitButton: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#28a745",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    minWidth: "200px",
    display: "flex",
    justifyContent: "center",
  },
  modalButton: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "40px",
  },
};

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    textAlign: "center",
  },
};

export default TransferMoneyScreen;
