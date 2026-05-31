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
import "./UserDashboard.css";

export default function UserDashboard({ onLogout }) {
  const [booking, setBooking] = useState(() => getBooking());
  const [serviceMessage, setServiceMessage] = useState("Your booking is confirmed and ready for check-in.");
  const [showBilling, setShowBilling] = useState(false);
  const totals = useMemo(() => calculateBooking(booking), [booking]);
  const isCancelled = booking.status === "cancelled";

  useEffect(() => subscribeBooking(setBooking), []);

  const updateBooking = (updates) => {
    setBooking((current) => saveBooking({ ...current, ...updates }));
  };

  const updateServiceCharges = (charges) => {
    setBooking((current) =>
      saveBooking({
        ...current,
        status: "service",
        serviceCharges: {
          ...current.serviceCharges,
          ...charges,
        },
      })
    );
  };

  const handleBookingFieldChange = (e) => {
    const { name, value } = e.target;
    updateBooking({ [name]: name === "guests" ? Number(value) : value });
    setServiceMessage("Booking details updated. Admin can see these changes too.");
  };

  const requestHousekeeping = () => {
    updateServiceCharges({ housekeeping: 300 });
    setShowBilling(false);
    setServiceMessage("Housekeeping has been requested. ₹300 was added to your balance.");
  };

  const orderRoomService = () => {
    updateServiceCharges({ roomService: 1000 });
    setShowBilling(false);
    setServiceMessage("Room service request sent. ₹1,000 was added to your balance.");
  };

  const viewBillingSummary = () => {
    setShowBilling((current) => !current);
    setServiceMessage("Billing summary is ready for review.");
  };

  const contactFrontDesk = () => {
    updateServiceCharges({ frontDesk: 0 });
    setShowBilling(false);
    setServiceMessage("Front desk has been notified. You will receive assistance soon.");
  };

  const cancelBooking = () => {
    updateBooking({ status: "cancelled" });
    setShowBilling(false);
    setServiceMessage("Your booking cancellation request has been recorded. Balance is now ₹0.");
  };

  const bookAgain = () => {
    updateBooking({ status: "confirmed" });
    setShowBilling(false);
    setServiceMessage("Your booking is active again. You can request services for your stay.");
  };

  const services = [
    { label: "Request housekeeping", action: requestHousekeeping },
    { label: "Order room service", action: orderRoomService },
    { label: showBilling ? "Hide billing summary" : "View billing summary", action: viewBillingSummary, allowWhenCancelled: true },
    { label: "Contact front desk", action: contactFrontDesk },
  ];

  const stayDetails = [
    { label: "Room", value: totals.room.label },
    { label: "Check-in", value: booking.checkIn },
    { label: "Check-out", value: booking.checkOut },
    { label: "Guests", value: `${totals.guests} ${totals.guests === 1 ? "Guest" : "Guests"}` },
  ];

  const billingItems = [
    { label: `Room charges (${totals.nights} night${totals.nights === 1 ? "" : "s"})`, value: formatCurrency(totals.roomCharges) },
    { label: "Extra guest charges", value: formatCurrency(totals.extraGuestCharges) },
    { label: "Service charges", value: formatCurrency(totals.serviceCharges) },
    { label: "Total payable", value: formatCurrency(totals.total) },
  ];

  return (
    <div>
      <Header onLogout={onLogout} role="user" />
      <main className="user-dashboard-container">
        <section className="user-hero">
          <div>
            <p className="user-kicker">Welcome back</p>
            <h1>{booking.userName || "Guest User"}'s stay at My Hotel</h1>
            <p>
              Check your booking, request services, and keep your stay details in one place.
            </p>
          </div>
          <div className={`booking-status ${booking.status}`}>
            <span>Booking Status</span>
            <strong>{statusLabels[booking.status]}</strong>
            {isCancelled ? (
              <button type="button" className="book-again-btn" onClick={bookAgain}>
                Book Again
              </button>
            ) : (
              <button type="button" className="cancel-booking-btn" onClick={cancelBooking}>
                Cancel Booking
              </button>
            )}
          </div>
        </section>

        <section className="user-grid" aria-label="Stay overview">
          <div className="user-panel stay-panel">
            <h2>Stay Details</h2>
            <div className="stay-details">
              {stayDetails.map((item) => (
                <div className="stay-detail" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div className="user-panel balance-panel">
            <h2>Current Balance</h2>
            <p className="balance-amount">{formatCurrency(totals.total)}</p>
            <span className="balance-note">Updates when room, dates, guests, or services change.</span>
          </div>
        </section>

        <section className="user-panel booking-edit-panel">
          <h2>Change Booking</h2>
          <form className="booking-edit-form">
            <label>
              User Name
              <input type="text" name="userName" value={booking.userName} onChange={handleBookingFieldChange} disabled={isCancelled} />
            </label>
            <label>
              Room
              <select name="roomType" value={booking.roomType} onChange={handleBookingFieldChange} disabled={isCancelled}>
                {roomOptions.map((room) => (
                  <option key={room.value} value={room.value}>
                    {room.label} - {formatCurrency(room.nightlyRate)}/night
                  </option>
                ))}
              </select>
            </label>
            <label>
              Check-in
              <input type="date" name="checkIn" value={booking.checkIn} onChange={handleBookingFieldChange} disabled={isCancelled} />
            </label>
            <label>
              Check-out
              <input type="date" name="checkOut" value={booking.checkOut} onChange={handleBookingFieldChange} disabled={isCancelled} />
            </label>
            <label>
              Guests
              <input type="number" name="guests" min="1" value={booking.guests} onChange={handleBookingFieldChange} disabled={isCancelled} />
            </label>
          </form>
        </section>

        <section className="user-panel service-panel">
          <div className="service-panel-header">
            <h2>Quick Services</h2>
            <p>{serviceMessage}</p>
          </div>
          <div className="service-grid">
            {services.map((service) => {
              const disabled = isCancelled && !service.allowWhenCancelled;

              return (
                <button
                  type="button"
                  className="service-card"
                  key={service.label}
                  onClick={service.action}
                  disabled={disabled}
                >
                  {service.label}
                </button>
              );
            })}
          </div>

          {showBilling && (
            <div className="billing-summary" aria-label="Billing summary">
              {billingItems.map((item) => (
                <div className="billing-summary-row" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

