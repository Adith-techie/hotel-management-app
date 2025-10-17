import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication check (replace with real backend later)
    if (email && password) {
      // Save login state in localStorage
      localStorage.setItem("isAuthenticated", "true");

      // Call parent callback to update state
      onLogin();

      // Redirect to Dashboard
      navigate("/dashboard");
    } else {
      alert("Enter valid credentials!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2> Hotel Management</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="signup-text">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
