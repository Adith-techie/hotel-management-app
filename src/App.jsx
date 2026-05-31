import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Rooms from "./pages/Rooms";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";
import UserDashboard from "./pages/UserDashboard";

export default function App() {
  const [auth, setAuth] = useState({ isAuthenticated: false, role: null });

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole");

    if (authStatus === "true" && ["admin", "user"].includes(storedRole)) {
      setAuth({ isAuthenticated: true, role: storedRole });
    }
  }, []);

  const handleLogin = (role) => {
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role);
    setAuth({ isAuthenticated: true, role });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    setAuth({ isAuthenticated: false, role: null });
  };

  if (!auth.isAuthenticated) {
    return (
      <Routes>
        <Route path="/*" element={<Login onLogin={handleLogin} />} />
      </Routes>
    );
  }

  if (auth.role === "user") {
    return (
      <Routes>
        <Route
          path="/user-dashboard"
          element={<UserDashboard onLogout={handleLogout} />}
        />
        <Route path="*" element={<Navigate to="/user-dashboard" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
      <Route path="/customers" element={<Customers onLogout={handleLogout} />} />
      <Route path="/rooms" element={<Rooms onLogout={handleLogout} />} />
      <Route path="/billing" element={<Billing onLogout={handleLogout} />} />
      <Route path="/reports" element={<Reports onLogout={handleLogout} />} />
      <Route path="/user-dashboard" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
