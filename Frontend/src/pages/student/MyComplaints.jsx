import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import {
  getComplaints,
  deleteComplaint,
} from "../../services/complaintService";

import "./MyComplaints.css";

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await getComplaints();
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComplaint = async (id) => {
    try {
      await deleteComplaint(id);

      setComplaints(
        complaints.filter(
          (complaint) =>
            complaint._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusClass = (status) => {
    if (status === "pending") return "pending";
    if (status === "in-progress")
      return "progress";
    if (status === "resolved")
      return "resolved";

    return "";
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <div className="mycomplaints-container">

          <div className="page-header">
            <h1>My Complaints</h1>

            <p>
              View all your submitted
              complaints
            </p>
          </div>

          <div className="filter-tabs">
            <button className="active">
              All ({complaints.length})
            </button>
          </div>

          {complaints.length === 0 ? (
            <div className="empty-state">
              <h2>No complaints found</h2>

              <p>
                You haven't submitted any
                complaints yet.
              </p>
            </div>
          ) : (
            <div className="complaints-grid">

              {complaints.map(
                (complaint) => (
                  <div
                    className="complaint-card"
                    key={complaint._id}
                  >
                    <div className="card-header">
                      <h3>
                        {complaint.title}
                      </h3>

                      <span
                        className={`status-badge ${getStatusClass(
                          complaint.status
                        )}`}
                      >
                        {complaint.status}
                      </span>
                    </div>

                    <p className="description">
                      {
                        complaint.description
                      }
                    </p>

                    <div className="card-footer">
                      <span>
                        🏷️{" "}
                        {
                          complaint.category
                        }
                      </span>

                      <span>
                        📅{" "}
                        {new Date(
                          complaint.createdAt
                        ).toLocaleDateString()}
                      </span>
                    </div>

                    {complaint.status ===
                      "pending" && (
                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDeleteComplaint(
                            complaint._id
                          )
                        }
                      >
                        Delete Complaint
                      </button>
                    )}
                  </div>
                )
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyComplaints;