import React, { useEffect, useState } from "react";
import "./ManageComplaints.css";

import Navbar from "../../components/Navbar";
import WardenSidebar from "../../components/WardenSidebar";

import {
getAllComplaints,
updateComplaintStatus,
} from "../../services/complaintService";

const ManageComplaints = () => {
const [complaints, setComplaints] = useState([]);
const [filter, setFilter] = useState("pending");

useEffect(() => {
fetchComplaints();
}, []);

const fetchComplaints = async () => {
try {
const response = await getAllComplaints();
setComplaints(response.data);
} catch (error) {
console.error(
"Error fetching complaints:",
error
);
}
};

const handleStatusChange = async (
complaintId,
newStatus
) => {
try {
await updateComplaintStatus(
complaintId,
newStatus
);

  fetchComplaints();
} catch (error) {
  console.error(error);
  alert("Failed to update status");
}

};

const pendingCount = complaints.filter(
(c) => c.status === "pending"
).length;

const progressCount = complaints.filter(
(c) => c.status === "in-progress"
).length;

const resolvedCount = complaints.filter(
(c) => c.status === "resolved"
).length;

const filteredComplaints =
filter === "all"
? complaints
: complaints.filter(
(c) => c.status === filter
);

return ( <div className="dashboard-layout"> <WardenSidebar />

  <div className="main-content">
    <Navbar />

    <div className="manage-container">

      <div className="page-header">
        <h1>Manage Complaints</h1>
        <p>
          View and update complaint
          status
        </p>
      </div>

      <div className="filter-tabs">

        <button
          className={
            filter === "all"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("all")
          }
        >
          All ({complaints.length})
        </button>

        <button
          className={
            filter === "pending"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("pending")
          }
        >
          Pending ({pendingCount})
        </button>

        <button
          className={
            filter ===
            "in-progress"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter(
              "in-progress"
            )
          }
        >
          In Progress (
          {progressCount})
        </button>

        <button
          className={
            filter ===
            "resolved"
              ? "active"
              : ""
          }
          onClick={() =>
            setFilter("resolved")
          }
        >
          Resolved (
          {resolvedCount})
        </button>

      </div>

      <div className="complaints-grid">

        {filteredComplaints.length >
        0 ? (
          filteredComplaints.map(
            (complaint) => (
              <div
                className="complaint-card"
                key={
                  complaint._id
                }
              >
                <div className="card-header">

                  <h3>
                    {
                      complaint.title
                    }
                  </h3>

                  {complaint.status ===
                  "resolved" ? (
                    <select
                      disabled
                      className="resolved-select"
                    >
                      <option value="resolved">
                        Resolved
                      </option>
                    </select>
                  ) : (
                    <select
                      value={
                        complaint.status
                      }
                      onChange={(
                        e
                      ) =>
                        handleStatusChange(
                          complaint._id,
                          e.target
                            .value
                        )
                      }
                    >
                      {complaint.status ===
                      "pending" ? (
                        <>
                          <option value="pending">
                            Pending
                          </option>

                          <option value="in-progress">
                            In
                            Progress
                          </option>

                          <option value="resolved">
                            Resolved
                          </option>
                        </>
                      ) : (
                        <>
                          <option value="in-progress">
                            In
                            Progress
                          </option>

                          <option value="resolved">
                            Resolved
                          </option>
                        </>
                      )}
                    </select>
                  )}

                </div>

                <p>
                  {
                    complaint.description
                  }
                </p>

                <div className="student-info">
                  <strong>
                    Student:
                  </strong>{" "}
                  {complaint
                    .studentId
                    ?.name ||
                    "Unknown Student"}
                </div>

                <div className="student-info">
                  <strong>
                    Email:
                  </strong>{" "}
                  {complaint
                    .studentId
                    ?.email ||
                    "No Email"}
                </div>

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

              </div>
            )
          )
        ) : (
          <div className="empty-state">
            <h3>
              No Complaints Found
            </h3>

            <p>
              No complaints in
              this category.
            </p>
          </div>
        )}

      </div>

    </div>
  </div>
</div>

);
};

export default ManageComplaints;
