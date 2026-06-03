const express = require("express");
const cors = require("cors");
const complaintRoutes = require("./routes/complaintroutes");
const authRoutes = require("./routes/authroutes");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/complaints", complaintRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;