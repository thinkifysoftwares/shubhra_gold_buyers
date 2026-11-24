const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");
const { verifyToken } = require("../middleware/authMiddleware");

// Public API - Customer can submit appointment
router.post("/", appointmentController.createAppointment);

// Protected APIs - Only logged-in admin
// Dashboard Statistics - Protected API
router.get("/", verifyToken, appointmentController.getAllAppointments);

router.get("/stats",verifyToken,appointmentController.getDashboardStats);

router.get("/:id", verifyToken, appointmentController.getAppointmentById);

router.put("/:id", verifyToken, appointmentController.updateAppointment);

router.patch("/:id/status", verifyToken, appointmentController.updateAppointmentStatus);

router.delete("/:id", verifyToken, appointmentController.deleteAppointment);

module.exports = router;
