import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.username.trim()) {
      alert("Enter username");
      return;
    }

    if (!formData.password.trim()) {
      alert("Enter password");
      return;
    }

    if (!formData.confirmPassword.trim()) {
      alert("Confirm your password");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "https://daytale-backend.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password
          })
        }
      );

      if (!response.ok) {
        throw new Error("Registration Failed");
      }

      alert("Registration Successful");
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Registration Failed");

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">

        <h1 className="register-title">
          Register
        </h1>

        <form onSubmit={handleSubmit} className="register-form">

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            className="register-input"
            disabled={loading}
          />

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="register-input"
              disabled={loading}
            />

            <button
              type="button"
              className="eye-btn"
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-wrapper">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="register-input"
              disabled={loading}
            />

            <button
              type="button"
              className="eye-btn"
              disabled={loading}
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              "Register"
            )}
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
          <Link to="/login" className="login-link">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}