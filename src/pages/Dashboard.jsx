import React, { useState } from "react";
import Header from "../components/Header";
import "./Dashboard.css";

export default function Dashboard({ onLogout }) {
  const [hotelInfo, setHotelInfo] = useState({
    name: "My Hotel",
    address: "123 Beach Road",
    description: "A cozy place to stay near the ocean.",
    image: null,
  });
  const [isEditing, setIsEditing] = useState(true);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setHotelInfo({ ...hotelInfo, [name]: value });
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
          <h2 className="dashboard-title">🌐 Dashboard</h2>
        <p className="dashboard-desc">
            ⚙️ Manage your hotel info and operations in one clean dashboard.
          </p>
          {/* Image Section */}
          <div className="hotel-image-section">
            <h3>Hotel Image</h3>
            {hotelInfo.image ? (
              <img
                src={hotelInfo.image}
                alt="Hotel"
                className="hotel-image"
              />
            ) : (
              <div className="hotel-image-placeholder">
                No Image Uploaded
              </div>
            )}
            {isEditing && (
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            )}
          </div>

          {/* Hotel Info Section */}
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
                <button
                  type="button"
                  onClick={handleSave}
                  className="save-btn"
                >
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
                <button
                  type="button"
                  onClick={handleEdit}
                  className="edit-btn"
                >
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