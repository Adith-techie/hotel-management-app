import React, { useState } from "react";
import Header from "../components/Header";
import "./Rooms.css";

export default function Rooms({ onLogout }) {
  const [rooms, setRooms] = useState([
    { number: 101, type: "Single", price: 100, available: true },
    { number: 102, type: "Double", price: 150, available: false },
  ]);
  const [newRoom, setNewRoom] = useState({ number: "", type: "", price: "" });

  const addRoom = (e) => {
    e.preventDefault();
    if (newRoom.number && newRoom.type && newRoom.price) {
      setRooms([...rooms, { ...newRoom, available: true }]);
      setNewRoom({ number: "", type: "", price: "" });
    }
  };

  const deleteRoom = (index) => {
    setRooms(rooms.filter((_, i) => i !== index));
  };

  const toggleAvailability = (index) => {
    setRooms(
      rooms.map((room, i) =>
        i === index ? { ...room, available: !room.available } : room
      )
    );
  };

  return (
    <div>
      <Header onLogout={onLogout} />
      <div className="rooms-container">
        <div className="rooms-card">
          <h2 className="rooms-title">🛏️ Rooms</h2>

          {/* Add Room Form */}
          <form onSubmit={addRoom} className="add-room-form">
            <input
              type="number"
              placeholder="Room Number"
              value={newRoom.number}
              onChange={(e) => setNewRoom({ ...newRoom, number: e.target.value })}
            />
            <input
              type="text"
              placeholder="Type (Single/Double)"
              value={newRoom.type}
              onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
            />
            <input
              type="number"
              placeholder="Price"
              value={newRoom.price}
              onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
            />
            <button type="submit" className="add-room-btn">
              Add Room
            </button>
          </form>

          {/* Room List */}
          <h3>Room Availability</h3>
          <ul className="room-list">
            {rooms.map((r, i) => (
              <li key={i} className="room-list-item">
                <span>
                  Room {r.number} — {r.type} — ${r.price}
                </span>
                <span>
                  {r.available ? "✅ Available" : "❌ Occupied"}
                  <button
                    onClick={() => toggleAvailability(i)}
                    className="toggle-room-btn"
                  >
                    Set {r.available ? "Occupied" : "Available"}
                  </button>
                  <button
                    onClick={() => deleteRoom(i)}
                    className="delete-room-btn"
                  >
                    Delete
                  </button>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}