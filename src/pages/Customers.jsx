import React, { useState } from "react";
import Header from "../components/Header";
import "./Customers.css";

export default function Customers({ onLogout }) {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const addCustomer = (e) => {
    e.preventDefault();
    if (name && room) {
      setCustomers([...customers, { name, room }]);
      setName("");
      setRoom("");
    }
  };

  const deleteCustomer = (index) => {
    setCustomers(customers.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="customers-container">
        <div className="customers-card">
          <h2 className="customers-title">👥 Customers</h2>
        <p className="customers-desc">
            🔍 Keep customer records organized and accessible anytime.
          </p>
          {/* Add Customer Form */}
          <form onSubmit={addCustomer} className="add-customer-form">
            <input
              type="text"
              placeholder="Customer Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Assign Room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <button type="submit" className="add-btn">
              Add Customer
            </button>
          </form>

          {/* Customer Records */}
          <h3>Customer Records</h3>
          <ul className="customer-list">
            {customers.map((c, i) => (
              <li key={i} className="customer-list-item">
                <span>
                  {c.name} — Room {c.room}
                </span>
                <button
                  onClick={() => deleteCustomer(i)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}