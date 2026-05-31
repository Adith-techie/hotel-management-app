import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const credentials = {
  admin: { email: "admin@hotel.com", password: "admin123" },
  user: { email: "user@hotel.com", password: "user123" },
};

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const selectedCredentials = credentials[role];
    const isValid =
      email.trim().toLowerCase() === selectedCredentials.email &&
      password === selectedCredentials.password;

    if (!isValid) {
      setError(`Use the ${role} demo credentials shown below.`);
      return;
    }

    setError("");
    onLogin(role);
    navigate(role === "admin" ? "/dashboard" : "/user-dashboard");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Hotel Management</h2>
        <div className="role-toggle" aria-label="Choose login type">
          <button
            type="button"
            className={role === "admin" ? "role-option active" : "role-option"}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
          <button
            type="button"
            className={role === "user" ? "role-option active" : "role-option"}
            onClick={() => setRole("user")}
          >
            User
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={role === "admin" ? "admin@hotel.com" : "user@hotel.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={role === "admin" ? "admin123" : "user123"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="login-error">{error}</p>}
          <button type="submit">Login as {role === "admin" ? "Admin" : "User"}</button>
        </form>
        <p className="signup-text">
          Demo {role} login: {credentials[role].email} / {credentials[role].password}
        </p>
      </div>
    </div>
  );
}
