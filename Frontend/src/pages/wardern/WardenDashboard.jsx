import React, { useEffect, useState } from "react";
import "./WardenDashboard.css";

import Navbar from "../../components/Navbar";
import WardenSidebar from "../../components/WardenSidebar";

import { getAllComplaints } from "../../services/complaintService";

const WardenDashboard = () => {
const [complaints, setComplaints] = useState([]);

useEffect(() => {
fetchComplaints();
}, []);

const fetchComplaints = async () => {
try {
const response = await getAllComplaints();
setComplaints(response.data);
} catch (error) {
console.error(error);
}
};

const totalComplaints = complaints.length;

const pendingComplaints = complaints.filter(
(c) => c.status === "pending"
).length;

const inProgressComplaints = complaints.filter(
(c) => c.status === "in-progress"
).length;

const resolvedComplaints = complaints.filter(
(c) => c.status === "resolved"
).length;

const pendingList = complaints
.filter(
(complaint) =>
complaint.status === "pending"
)
.sort(
(a, b) =>
new Date(b.createdAt) -
new Date(a.createdAt)
)
.slice(0, 5);

return ( <div className="dashboard-layout"> <WardenSidebar />

  <div className="main-content">
    <Navbar />

    <div className="warden-dashboard-container">

      <div className="dashboard-header">
        <h1>Warden Dashboard</h1>

        <p>
          Monitor and manage hostel
          complaints
        </p>
      </div>

      {/* Stats Cards */}

      <div className="stats-grid">

        <div className="stat-card">
          <h3>Total Complaints</h3>
          <h2>{totalComplaints}</h2>
        </div>

        <div className="stat-card pending-card">
          <h3>Pending</h3>
          <h2>{pendingComplaints}</h2>
        </div>

        <div className="stat-card progress-card">
          <h3>In Progress</h3>
          <h2>{inProgressComplaints}</h2>
        </div>

        <div className="stat-card resolved-card">
          <h3>Resolved</h3>
          <h2>{resolvedComplaints}</h2>
        </div>

      </div>

      {/* Pending Complaints */}

      <div className="recent-section">

        <h2>Pending Complaints</h2>

        <div className="recent-grid">

          {pendingList.length > 0 ? (
            pendingList.map(
              (complaint) => (
                <div
                  className="recent-card"
                  key={complaint._id}
                >
                  <h3>
                    {complaint.title}
                  </h3>

                  <p>
                    {
                      complaint.description
                    }
                  </p>

                  <div className="student-details">
                    <strong>
                      Student:
                    </strong>{" "}
                    {complaint
                      .studentId
                      ?.name ||
                      "Unknown Student"}
                  </div>

                  <div className="student-details">
                    <strong>
                      Category:
                    </strong>{" "}
                    {
                      complaint.category
                    }
                  </div>

                  <div className="student-details">
                    <strong>
                      Date:
                    </strong>{" "}
                    {new Date(
                      complaint.createdAt
                    ).toLocaleDateString()}
                  </div>

                  <div className="status-badge">
                    Pending
                  </div>
                </div>
              )
            )
          ) : (
            <div className="empty-state">
              <h3>
                No Pending Complaints
              </h3>

              <p>
                All complaints have
                been processed.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>
  </div>
</div>

);
};

export default WardenDashboard;
