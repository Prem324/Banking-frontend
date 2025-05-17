import "./App.css";
import React from "react";
import SignupScreen from "./pages/SignUpScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SuccessPage from "./pages/SuccessPage";
import FailurePage from "./pages/FailurePage";
import SignInPage from "./pages/SignInPage";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import CreateAccount from "./pages/CreateAccount";
import Dashboard from "./pages/Dashboard";
import NotFoundPage from "./pages/NotFoundPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import TransferMoneyScreen from "./pages/TransferMoney";
import BankAccountSummary from "./pages/AccountSummary";
import LoginFailurePage from "./pages/LoginFailurePage";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/failure" element={<FailurePage />} />
            <Route path="/loginfailure" element={<LoginFailurePage />} />
            <Route
              path="/footer"
              element={<ProtectedRoute element={<Footer />} />}
            />
            <Route
              path="/CreateAccount"
              element={<ProtectedRoute element={<CreateAccount />} />}
            />
            <Route
              path="/Dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/transfer"
              element={<ProtectedRoute element={<TransferMoneyScreen />} />}
            />
            <Route
              path="/accountSummary/:id"
              element={<ProtectedRoute element={<BankAccountSummary />} />}
            />
            <Route path="*" element={<NotFoundPage />} />{" "}
            {/* Catch-all for 404 */}
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
