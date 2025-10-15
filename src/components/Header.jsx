import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">🏨 Hotel Management</div>
      <nav className="nav-links">
        <NavLink to="/dashboard" className="nav-item">
          Dashboard
        </NavLink>
        <NavLink to="/customers" className="nav-item">
          Customers
        </NavLink>
        <NavLink to="/rooms" className="nav-item">
          Rooms
        </NavLink>
        <NavLink to="/billing" className="nav-item">
          Billing
        </NavLink>
        <NavLink to="/reports" className="nav-item">
          Reports
        </NavLink>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}
