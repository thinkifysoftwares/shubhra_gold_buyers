
const express = require("express");
const router = express.Router();

const {
    adminLogin,
    getAdminProfile
} = require("../controllers/authController");

const { getDashboardStats } = require("../controllers/appointmentController");

const { verifyToken } = require("../middleware/authMiddleware");

// Public login
router.post("/login", adminLogin);

// Protected routes
router.get("/profile", verifyToken, getAdminProfile);

router.get("/dashboard", verifyToken, getDashboardStats);

module.exports = router;
