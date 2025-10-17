import React, { useState } from "react";
import Header from "../components/Header";
import "./Billing.css";

export default function Billing({ onLogout }) {
  const [customer, setCustomer] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [days, setDays] = useState("");
  const [bills, setBills] = useState([]);

  const handleAddBill = (e) => {
    e.preventDefault();
    if (customer && roomPrice && days) {
      const total = Number(roomPrice) * Number(days);
      setBills([
        ...bills,
        { customer, roomPrice: Number(roomPrice), days: Number(days), total },
      ]);
      setCustomer("");
      setRoomPrice("");
      setDays("");
    }
  };

  const deleteBill = (index) => {
    setBills(bills.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="billing-container">
        <div className="billing-card">
          <h2 className="billing-title">💳 Billing</h2>
          <p className="billing-desc">
           ⚡Fast, seamless billing for your hotel guests.
          </p>
          <form onSubmit={handleAddBill} className="billing-form">
            <input
              type="text"
              placeholder="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <input
              type="number"
              placeholder="Room Price"
              value={roomPrice}
              onChange={(e) => setRoomPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="No. of Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            <button type="submit" className="add-bill-btn">
              Generate Bill
            </button>
          </form>

          <h3>Bills</h3>
          <ul className="bill-list">
            {bills.map((bill, i) => (
              <li key={i} className="bill-list-item">
                <span>
                  <strong>{bill.customer}</strong> — ₹{bill.roomPrice} × {bill.days} days = <strong>₹{bill.total}</strong>
                </span>
                <button
                  onClick={() => deleteBill(i)}
                  className="delete-bill-btn"
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