const express = require("express");
const roleMiddleware = require("../Middlewares/rolemiddleware");
const router = express.Router();
const {complaintController} = require("../controllers/complaintcontroller");
const authMiddleware = require("../Middlewares/authmiddleware");

router.get(
    "/all",
    authMiddleware,
    roleMiddleware("warden"),
    complaintController.getAllComplaints
);

router.get(
    "/stats",
    authMiddleware,
    roleMiddleware("warden"),
    complaintController.getComplaintStats
);

router.post("/", authMiddleware, complaintController.createComplaint);
router.get("/", authMiddleware, complaintController.getComplaints);

router.put(
    "/:id/status",
    authMiddleware,
    roleMiddleware("warden"),
    complaintController.updateComplaintStatus
);

router.delete("/:id", authMiddleware, complaintController.deleteComplaint);

module.exports = router;