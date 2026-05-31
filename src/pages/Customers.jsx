import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import {
  calculateBooking,
  formatCurrency,
  getBooking,
  statusLabels,
  subscribeBooking,
} from "../bookingStore";
import "./Customers.css";

export default function Customers({ onLogout }) {
  const [customers, setCustomers] = useState([]);
  const [booking, setBooking] = useState(() => getBooking());
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const totals = useMemo(() => calculateBooking(booking), [booking]);

  useEffect(() => subscribeBooking(setBooking), []);

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
          <h2 className="customers-title">Customers</h2>
          <p className="customers-desc">
            Keep customer records organized and accessible anytime.
          </p>

          <section className="shared-booking-record">
            <div>
              <span className="record-label">Live User Booking</span>
              <h3>{booking.userName || "Guest User"}</h3>
              <p>
                {totals.room.label} | {booking.checkIn} to {booking.checkOut} | {totals.guests} guest{totals.guests === 1 ? "" : "s"}
              </p>
            </div>
            <div className="record-meta">
              <span className={`customer-status ${booking.status}`}>{statusLabels[booking.status]}</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>
          </section>

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

          <h3>Customer Records</h3>
          <ul className="customer-list">
            {customers.map((c, i) => (
              <li key={i} className="customer-list-item">
                <span>
                  {c.name} - Room {c.room}
                </span>
                <button onClick={() => deleteCustomer(i)} className="delete-btn">
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
