import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ onLogout, role = "admin" }) {
  const navigate = useNavigate();
  const isAdmin = role === "admin";

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo">Hotel Management</div>
      <nav className="nav-links" aria-label={isAdmin ? "Admin navigation" : "User navigation"}>
        {isAdmin ? (
          <>
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
          </>
        ) : (
          <NavLink to="/user-dashboard" className="nav-item">
            My Stay
          </NavLink>
        )}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  );
}
