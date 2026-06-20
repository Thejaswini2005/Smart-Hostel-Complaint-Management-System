import axiosInstance from "./axiosInstance";

export const createComplaint = (complaintData) => {
return axiosInstance.post("/complaints", complaintData);
};

export const getComplaints = () => {
return axiosInstance.get("/complaints");
};

export const getComplaintById = (id) => {
return axiosInstance.get(`/complaints/${id}`);
};

export const getComplaintStats = () => {
return axiosInstance.get("/complaints/stats");
};

/* =========================
Warden APIs
========================= */

export const getAllComplaints = () => {
return axiosInstance.get("/complaints/all");
};

export const updateComplaintStatus = (id, status) => {
return axiosInstance.put(
`/complaints/${id}/status`,
{ status }
);
};

export const deleteComplaint = (id) => {
  return axiosInstance.delete(`/complaints/${id}`);
};
