import React from "react";
import "./StudentProfile.css";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

const StudentProfile = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <Navbar />

        <div className="profile-container">

          {/* Profile Header */}
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .toUpperCase()
                : "U"}
            </div>

            <div className="profile-user-info">
              <h2>{user?.name || "Student"}</h2>

              <p>{user?.email || "No Email"}</p>

              <span className="role-badge">
                👤 {user?.role || "Student"}
              </span>
            </div>
          </div>

          {/* Personal Information */}
          <div className="profile-card">
            <h3>Personal Information</h3>

            <div className="info-grid">
              <div className="input-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={user?.name || ""}
                  readOnly
                />
              </div>

              <div className="input-group">
                <label>Email Address</label>
                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                />
              </div>

              <div className="input-group full-width">
                <label>Role</label>
                <input
                  type="text"
                  value={user?.role || ""}
                  readOnly
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;