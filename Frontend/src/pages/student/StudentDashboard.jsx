import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.CSS";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import { getComplaints } from "../../services/complaintService";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();

      console.log("Complaints:", response.data);

      const sortedComplaints = response.data.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );

      setComplaints(sortedComplaints);
    } catch (error) {
      console.error(
        "Error fetching complaints:",
        error
      );
    } finally {
      setLoading(false);
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

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="dashboard-container">

          {/* Header */}
          <div className="dashboard-header">
            <div className="header-left">
              <h1>Dashboard</h1>
              <p>
                Overview of your complaints and quick
                actions
              </p>
            </div>

            <button
              className="dashboard-create-btn"
              onClick={() =>
                navigate(
                  "/student/create-complaint"
                )
              }
            >
              + Create New Complaint
            </button>
          </div>

          {/* Stats Cards */}
          <div className="stats-container">

            <div className="stat-card">
              <div className="card-header">
                <div>
                  <h3>Total Complaints</h3>
                  <h2>{totalComplaints}</h2>
                </div>

                <div className="icon-box blue">
                  📋
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-header">
                <div>
                  <h3>Pending</h3>
                  <h2>{pendingComplaints}</h2>
                </div>

                <div className="icon-box yellow">
                  ⏳
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-header">
                <div>
                  <h3>In Progress</h3>
                  <h2>{inProgressComplaints}</h2>
                </div>

                <div className="icon-box progress">
                  ⚠️
                </div>
              </div>
            </div>

            <div className="stat-card">
              <div className="card-header">
                <div>
                  <h3>Resolved</h3>
                  <h2>{resolvedComplaints}</h2>
                </div>

                <div className="icon-box green">
                  ✅
                </div>
              </div>
            </div>

          </div>

          {/* Recent Complaints */}
          <div className="recent-section">

            <div className="section-header">
              <div>
                <h2>Recent Complaints</h2>
                <p>
                  Your latest submitted complaints
                </p>
              </div>

              <button
                className="view-btn"
                onClick={() =>
                  navigate(
                    "/student/my-complaints"
                  )
                }
              >
                View All
              </button>
            </div>

            <div className="complaints-grid">

              {loading ? (
                <p>Loading complaints...</p>
              ) : complaints.length > 0 ? (
                complaints.map((complaint) => (
                    <div
                      className="complaint-card"
                      key={complaint._id}
                    >
                      <div className="card-top">
                        <h3>
                          {complaint.title}
                        </h3>

                        <span
                          className={`status ${
                            complaint.status ===
                            "pending"
                              ? "pending-status"
                              : complaint.status ===
                                "in-progress"
                              ? "progress-status"
                              : "resolved-status"
                          }`}
                        >
                          {complaint.status}
                        </span>
                      </div>

                      <p>
                        {
                          complaint.description
                        }
                      </p>

                      <div className="card-footer">
                        <span>
                          {
                            complaint.category
                          }
                        </span>

                        <span>
                          {complaint.createdAt
                            ? new Date(
                                complaint.createdAt
                              ).toLocaleDateString()
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="empty-state">
                  <h3>
                    No Complaints Yet
                  </h3>
                  <p>
                    Create your first
                    complaint to see it
                    here.
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

export default StudentDashboard;