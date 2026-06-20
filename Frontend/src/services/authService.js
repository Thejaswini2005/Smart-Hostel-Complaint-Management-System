import axios from "axios";

const API = axios.create({
  baseURL:
    "https://smart-hostel-complaint-management-system.onrender.com/api/auth",
});

export const registerUser = (userData) => {
  return API.post("/register", userData);
};

export const loginUser = (userData) => {
  return API.post("/login", userData);
};