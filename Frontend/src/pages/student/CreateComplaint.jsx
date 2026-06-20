import React, { useState } from "react";
import { createComplaint } from "../../services/complaintService";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import "./CreateComplaint.css";

const CreateComplaint = () => {
  const [complaintData, setComplaintData] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setComplaintData({
      ...complaintData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComplaint(complaintData);
   
      setSuccessMessage("Complaint submitted successfully!");
      setComplaintData({
        title: "",
        description: "",
        category: "",
      });

      setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
    } catch (error) {
  console.error("Error:", error);

  if (error.response) {
    console.log("Response Data:", error.response.data);
    console.log("Status:", error.response.status);
  }

  alert("Failed to submit complaint");
}
  };

  return (
    <div className="dashboard-layout">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        
        {/* Navbar */}
        <Navbar />

        <div className="create-complaint-container">

          {/* Page Header */}
          <div className="page-header">
            <h1>Create Complaint</h1>
            <p>
              Submit a new complaint to the hostel management
            </p>
          </div>

          {/* Form Card */}
          <div className="form-card">
             {successMessage && (
  <div className="success-toast">
    <span className="success-icon">✓</span>
    <span>{successMessage}</span>
  </div>
)}
            <h2>Complaint Details</h2>

            <form
              onSubmit={handleSubmit}
              className="complaint-form"
            >

              {/* Title */}
              <div className="form-group">
                <label>Complaint Title *</label>

                <input
                  type="text"
                  name="title"
                  value={complaintData.title}
                  onChange={handleChange}
                  placeholder="Brief title describing the issue"
                  required
                />
              </div>

              {/* Category */}
              <div className="form-group">
                <label>Category *</label>

                <select
                  name="category"
                  value={complaintData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">
                    Select a category
                  </option>

                  <option value="Water">
                    Water
                  </option>

                  <option value="Electricity">
                    Electricity
                  </option>

                  <option value="Network">
                    Network
                  </option>

                  <option value="Furniture">
                    Furniture
                  </option>

                  <option value="Cleanliness">
                    Cleanliness
                  </option>
                </select>
              </div>

              {/* Description */}
              <div className="form-group">
                <label>Description *</label>

                <textarea
                  name="description"
                  rows="6"
                  value={complaintData.description}
                  onChange={handleChange}
                  placeholder="Describe the issue in detail..."
                  required
                />
              </div>

              {/* Button */}
              <div className="button-group">
  <button
    type="button"
    className="cancel-btn"
    onClick={() =>
      setComplaintData({
        title: "",
        description: "",
        category: "",
      })
    }
  >
    Cancel
  </button>

  <button
    type="submit"
    className="submit-btn"
  >
    Submit Complaint
  </button>
</div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default CreateComplaint;