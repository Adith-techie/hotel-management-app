import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import {
  calculateBooking,
  formatCurrency,
  getBooking,
  roomOptions,
  saveBooking,
  statusLabels,
  subscribeBooking,
} from "../bookingStore";
import "./Dashboard.css";

export default function Dashboard({ onLogout }) {
  const [hotelInfo, setHotelInfo] = useState({
    name: "My Hotel",
    address: "123 Beach Road",
    description: "A cozy place to stay near the ocean.",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(true);
  const [booking, setBooking] = useState(() => getBooking());
  const totals = useMemo(() => calculateBooking(booking), [booking]);

  useEffect(() => subscribeBooking(setBooking), []);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo({ ...hotelInfo, [name]: value });
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking((current) =>
      saveBooking({
        ...current,
        [name]: name === "guests" ? Number(value) : value,
      })
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHotelInfo({ ...hotelInfo, image: imageUrl });
    }
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="dashboard-container">
        <div className="dashboard-card">
          <h2 className="dashboard-title">Dashboard</h2>
          <p className="dashboard-desc">
            Manage hotel info, user bookings, and operations in one clean dashboard.
          </p>

          <section className="admin-booking-panel">
            <div className="admin-booking-header">
              <div>
                <h3>User Booking</h3>
                <p>Changes here update the user dashboard immediately in this browser .</p>
              </div>
              <div className={`admin-status ${booking.status}`}>{statusLabels[booking.status]}</div>
            </div>

            <form className="admin-booking-form">
              <label>
                Room
                <select name="roomType" value={booking.roomType} onChange={handleBookingChange}>
                  {roomOptions.map((room) => (
                    <option key={room.value} value={room.value}>
                      {room.label} - {formatCurrency(room.nightlyRate)}/night
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Check-in
                <input type="date" name="checkIn" value={booking.checkIn} onChange={handleBookingChange} />
              </label>
              <label>
                Check-out
                <input type="date" name="checkOut" value={booking.checkOut} onChange={handleBookingChange} />
              </label>
              <label>
                Guests
                <input type="number" name="guests" min="1" value={booking.guests} onChange={handleBookingChange} />
              </label>
              <label>
                Status
                <select name="status" value={booking.status} onChange={handleBookingChange}>
                  <option value="confirmed">Confirmed</option>
                  <option value="service">Service Requested</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </label>
            </form>

            <div className="admin-booking-summary">
              <span>{totals.room.label}</span>
              <span>{totals.nights} night{totals.nights === 1 ? "" : "s"}</span>
              <strong>{formatCurrency(totals.total)}</strong>
            </div>
          </section>

          <div className="hotel-image-section">
            <h3>Hotel Image</h3>
            {hotelInfo.image ? (
              <img src={hotelInfo.image} alt="Hotel" className="hotel-image" />
            ) : (
              <div className="hotel-image-placeholder">No Image Uploaded</div>
            )}
            {isEditing && (
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            )}
          </div>

          <div>
            <h3>Hotel Information</h3>
            {isEditing ? (
              <form className="hotel-info-form">
                <input
                  type="text"
                  name="name"
                  placeholder="Hotel Name"
                  value={hotelInfo.name}
                  onChange={handleInfoChange}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Hotel Address"
                  value={hotelInfo.address}
                  onChange={handleInfoChange}
                />
                <textarea
                  name="description"
                  placeholder="Hotel Description"
                  value={hotelInfo.description}
                  onChange={handleInfoChange}
                />
                <button type="button" onClick={handleSave} className="save-btn">
                  Save Changes
                </button>
              </form>
            ) : (
              <div className="hotel-info-view">
                <div>
                  <strong>Name:</strong> {hotelInfo.name}
                </div>
                <div>
                  <strong>Address:</strong> {hotelInfo.address}
                </div>
                <div>
                  <strong>Description:</strong> {hotelInfo.description}
                </div>
                <button type="button" onClick={handleEdit} className="edit-btn">
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
