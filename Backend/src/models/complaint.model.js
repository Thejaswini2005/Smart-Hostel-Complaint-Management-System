const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String },
    status: { type: String, enum: ["pending", "in-progress", "resolved"], default: "pending" },
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
     }
}, { timestamps: true });   

const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = Complaint;