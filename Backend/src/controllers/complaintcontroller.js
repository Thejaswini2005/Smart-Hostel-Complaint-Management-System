const Complaint = require("../models/complaint.model");

const createComplaint = async (req, res) => {
    try {
        const { title, description, category, studentId } = req.body;

        const complaint = new Complaint({
            title,
            description,
            category,
            studentId: req.user.userId
        });

        await complaint.save();

        res.status(201).json({
            message: "Complaint created successfully",
            complaint
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating complaint",
            error: error.message
        });
    }
};

const getComplaints = async (req, res) => {
    try {
        const complaints = await Complaint.find( {studentId: req.user.userId});
        res.status(200).json(complaints);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching complaints", error: error.message });
    }
};

const updateComplaintStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(id, { status }, { new: true });
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }   
        res.status(200).json({ message: "Complaint status updated successfully", complaint });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating complaint status", error: error.message });
    }
};

const deleteComplaint = async (req, res) => {
    try {
        const { id } = req.params;  
        const complaint = await Complaint.findByIdAndDelete(id);
        if (!complaint) {
            return res.status(404).json({ message: "Complaint not found" });
        }   
        res.status(200).json({ message: "Complaint deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting complaint", error: error.message });
    }   
};
const getAllComplaints = async (req, res) => {
    try {

        const complaints = await Complaint.find()
            .populate("studentId", "name email");

        res.status(200).json(complaints);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getComplaintStats = async (req, res) => {
    try {

        const totalComplaints = await Complaint.countDocuments();

        const pendingComplaints = await Complaint.countDocuments({
            status: "pending"
        });

        const inProgressComplaints = await Complaint.countDocuments({
            status: "in-progress"
        });

        const resolvedComplaints = await Complaint.countDocuments({
            status: "resolved"
        });

        res.status(200).json({
            totalComplaints,
            pendingComplaints,
            inProgressComplaints,
            resolvedComplaints
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


const complaintController = {
    createComplaint,
    getComplaints,
    updateComplaintStatus,
    deleteComplaint,
    getAllComplaints,
    getComplaintStats
};

module.exports = {
    complaintController
};