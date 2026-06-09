import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProtectedRoute.css";

export default function ProtectedRoute({ children }) {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="protected-container">

        <div className="protected-card">

          <h2>Authentication Required</h2>

          <p>
            Please login to access this page.
          </p>

          <button
            className="login-btn"
            onClick={() => navigate("/login")}
          >
            Go To Login
          </button>

        </div>

      </div>
    );
  }

  return children;
}