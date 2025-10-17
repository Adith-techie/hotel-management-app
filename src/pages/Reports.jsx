import React, { useState } from "react";
import Header from "../components/Header";
import "./Reports.css";

export default function Reports({ onLogout }) {
  const [customer, setCustomer] = useState("");
  const [room, setRoom] = useState("");
  const [days, setDays] = useState("");
  const [amount, setAmount] = useState("");

  const handleDownload = (e) => {
    e.preventDefault();
    const report = 
      `Customer Report\n\n` +
      `Name: ${customer}\n` +
      `Room: ${room}\n` +
      `Days Stayed: ${days}\n` +
      `Total Amount: ₹${amount}\n`;

    const blob = new Blob([report], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${customer || "customer"}_report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="reports-container">
        <div className="reports-card">
          <h2 className="reports-title">📊 Reports</h2>
          <p className="reports-desc">
           📈 Generate detailed reports and insights in a click.
          </p>
          <form className="report-form" onSubmit={handleDownload}>
            <input
              type="text"
              placeholder="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room Number"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
            <input
              type="number"
              placeholder="Days Stayed"
              value={days}
              onChange={(e) => setDays(e.target.value)}
            />
            <input
              type="number"
              placeholder="Total Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button type="submit" className="download-report-btn">
              Download Report
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}