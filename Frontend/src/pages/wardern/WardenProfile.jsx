import React from "react";
import "./WardenProfile.css";

import Navbar from "../../components/Navbar";
import WardenSidebar from "../../components/WardenSidebar";

const WardenProfile = () => {
const user =
JSON.parse(localStorage.getItem("user")) || {};

return ( <div className="dashboard-layout"> <WardenSidebar />


  <div className="main-content">
    <Navbar />

    <div className="profile-container">

      <div className="profile-header">

        <div className="profile-avatar">
          {user?.name
            ? user.name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .toUpperCase()
            : "W"}
        </div>

        <div className="profile-user-info">
          <h2>{user?.name}</h2>

          <p>{user?.email}</p>

          <span className="role-badge">
            👤 {user?.role}
          </span>
        </div>

      </div>

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

export default WardenProfile;
