import React, { useState } from "react";
import Modal from "react-modal";
import Sidebar from "./SideBar";
import Breadcrumb from "./BreadCrumb"; // Import Breadcrumb
import { useNavigate } from "react-router-dom";
import ButtonLoader from "./ButtonLoader";

// Set app element for accessibility
Modal.setAppElement("#root");

const BankAccountForm = () => {
  const [formData, setFormData] = useState({
    accountType: "Savings",
    currentBalance: "",
    nominee: "",
    branchName: "",
    placeOfBirth: "",
    dateofbirth: "",
    phoneNumber: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("India");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [pincodeOptions, setPincodeOptions] = useState([]);

  const navigate = useNavigate();

  const data = {
    India: {
      states: {
        "Andhra Pradesh": {
          cities: {
            Visakhapatnam: ["530001", "530002", "530003", "530004", "530005"],
            Vijayawada: ["520001", "520002", "520003", "520004", "520005"],
            Guntur: ["522001", "522002", "522003", "522004", "522005"],
            Tirupati: ["517501", "517502", "517503", "517504", "517505"],
            Kakinada: ["533001", "533002", "533003", "533004", "533005"],
          },
        },
        "Tamil Nadu": {
          cities: {
            Chennai: ["600001", "600002", "600003", "600004", "600005"],
            Coimbatore: ["641001", "641002", "641003", "641004", "641005"],
            Madurai: ["625001", "625002", "625003", "625004", "625005"],
            Tiruchirappalli: ["620001", "620002", "620003", "620004", "620005"],
            Salem: ["636001", "636002", "636003", "636004", "636005"],
          },
        },
        Karnataka: {
          cities: {
            Bangalore: ["560001", "560002", "560003", "560004", "560005"],
            Mysore: ["570001", "570002", "570003", "570004", "570005"],
            Hubli: ["580001", "580002", "580003", "580004", "580005"],
            Mangalore: ["575001", "575002", "575003", "575004", "575005"],
            Bellary: ["583101", "583102", "583103", "583104", "583105"],
          },
        },
        Maharashtra: {
          cities: {
            Mumbai: ["400001", "400002", "400003", "400004", "400005"],
            Pune: ["411001", "411002", "411003", "411004", "411005"],
            Nashik: ["422001", "422002", "422003", "422004", "422005"],
            Aurangabad: ["431001", "431002", "431003", "431004", "431005"],
            Thane: ["400601", "400602", "400603", "400604", "400605"],
          },
        },
        Gujarat: {
          cities: {
            Ahmedabad: ["380001", "380002", "380003", "380004", "380005"],
            Surat: ["395001", "395002", "395003", "395004", "395005"],
            Vadodara: ["390001", "390002", "390003", "390004", "390005"],
            Rajkot: ["360001", "360002", "360003", "360004", "360005"],
            Bhavnagar: ["364001", "364002", "364003", "364004", "364005"],
          },
        },
      },
    },
    // Add more countries if necessary
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ... existing code ...
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const userName = localStorage.getItem("userName")
      ? JSON.parse(localStorage.getItem("userName"))
      : undefined;
    const token = localStorage.getItem("token");

    await new Promise((resolve) => setTimeout(resolve, 500));

    const response = await fetch("http://localhost:8080/createAccount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
      body: JSON.stringify({ ...formData, currentBalance: Number(formData.currentBalance), userName }),
    });

    const data = await response.json();

    if (response.status === 201) {
      setModalMessage(data.message || "Account created successfully!");
      setModalIsOpen(true);
      // Optionally use data.account here
    } else {
      setModalMessage(data.message || "Failed to create account.");
      setModalIsOpen(true);
    }
  } catch (error) {
    setModalMessage("Network error, please try again.");
    setModalIsOpen(true);
  } finally {
    setLoading(false);
  }
};

  const closeModal = () => {
    navigate("/Dashboard");
    setModalIsOpen(false);
  };

  const handleCountryChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedState(""); // Reset state
    setSelectedCity(""); // Reset city
    setCityOptions(country ? Object.keys(data[country].states) : []);
    setPincodeOptions([]);
    setFormData({ ...formData, country: country }); // Update formData
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity(""); // Reset city
    if (state) {
      setCityOptions(Object.keys(data[selectedCountry].states[state].cities));
      setPincodeOptions([]);
    } else {
      setCityOptions([]);
    }
    setFormData({ ...formData, state: state }); // Update formData
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    if (city) {
      setPincodeOptions(
        data[selectedCountry].states[selectedState].cities[city]
      );
    } else {
      setPincodeOptions([]);
    }
    setFormData({ ...formData, city: city }); // Update formData
  };

  const handlePincodeChange = (e) => {
    const pincode = e.target.value;
    setFormData({ ...formData, pincode: pincode }); // Update formData
  };

  return (
    <div style={styles.container}>
      <Sidebar />
      <div style={styles.formContainer}>
        <Breadcrumb path={"Apply for an Account"} /> {/* Add Breadcrumb here */}
        <h2 style={styles.header}>Apply For an Account</h2>
        {/* {loading ? (
          <div style={styles.loader}>Loading...</div>
        ) : ( */}
        <form onSubmit={handleSubmit} style={styles.form}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} style={styles.inputGroup}>
              <label style={styles.label}>
                {key === "currentBalance"
                  ? "Deposit Amount"
                  : key
                      .replace(/([A-Z])/g, " $1")
                      .charAt(0)
                      .toUpperCase() + key.slice(1)}
                :
              </label>
              {key === "accountType" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Fixed Deposit">Fixed Deposit</option>
                  <option value="Loan">Loan</option>
                  <option value="Mortgage">Mortgage</option>
                  <option value="Credit Card">Credit Card</option>
                </select>
              ) : key === "branchName" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Branch</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jaipur">Jaipur</option>
                  <option value="Vizag">Vizag</option>
                </select>
              ) : key === "country" ? (
                <select
                  name={key}
                  value={selectedCountry}
                  onChange={handleCountryChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Country</option>
                  {Object.keys(data).map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              ) : key === "state" ? (
                <select
                  name={key}
                  value={selectedState}
                  onChange={handleStateChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(data[selectedCountry]?.states || {}).map(
                    (state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    )
                  )}
                </select>
              ) : key === "city" ? (
                <select
                  name={key}
                  value={selectedCity}
                  onChange={handleCityChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select City</option>
                  {cityOptions.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              ) : key === "pincode" ? (
                <select
                  name={key}
                  value={value}
                  onChange={handlePincodeChange}
                  style={styles.input}
                  required
                >
                  <option value="">Select Pincode</option>
                  {pincodeOptions.map((pincode) => (
                    <option key={pincode} value={pincode}>
                      {pincode}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={key === "dateofbirth" ? "date" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={styles.input}
                  max={new Date().toISOString().split("T")[0]}
                  required={key === "currentBalance" || key === "branchId"}
                />
              )}
            </div>
          ))}

          {/* Button Container */}
          <div style={styles.buttonContainer}>
            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? <ButtonLoader /> : "Create Account"}
            </button>
          </div>
        </form>
        {/* )} */}
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
    display: "flex",
    height: "100%",
  },
  formContainer: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#FFFFFF",
    height: "85vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#3B536F",
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "15px",
    padding: "20px",
    gridTemplateRows: "auto 1fr auto", // Ensure button stays at the bottom
  },
  buttonContainer: {
    gridColumn: "1 / -1", // Span across all columns
    display: "flex",
    justifyContent: "center", // Center the button
    marginTop: "20px", // Add some space above the button
  },
  inputGroup: {
    marginBottom: "15px",
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
    minWidth: "180px",
    display: "flex",
    justifyContent: "center",
  },
  loader: {
    textAlign: "center",
    fontSize: "20px",
    color: "#28a745",
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

export default BankAccountForm;
