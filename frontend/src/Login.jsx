import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: ""
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

    try {
      setLoading(true);

      const response = await fetch(
        "https://daytale-backend.onrender.com/auth/login",
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
        throw new Error("Invalid Credentials");
      }

      const token = await response.text();

      localStorage.setItem("token", token);
      localStorage.setItem("username", formData.username);

      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">

      <div className="login-card">

        <h1 className="login-title">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="login-form">

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            value={formData.username}
            onChange={handleChange}
            className="login-input"
            disabled={loading}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            className="login-input"
            disabled={loading}
          />

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}