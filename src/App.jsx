import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Rooms from "./pages/Rooms";
import Billing from "./pages/Billing";
import Reports from "./pages/Reports";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(false); //loogin
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Routes>
      {!isAuthenticated ? (
        <Route path="/*" element={<Login onLogin={handleLogin} />} />
      ) : (
        <>
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />
          <Route path="/customers" element={<Customers onLogout={handleLogout} />} />
          <Route path="/rooms" element={<Rooms onLogout={handleLogout} />} />
          <Route path="/billing" element={<Billing onLogout={handleLogout} />} />
          <Route path="/reports" element={<Reports onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </>
      )}
    </Routes>
  );
}
