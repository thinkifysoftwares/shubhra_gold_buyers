
// require("dotenv").config();

// const express = require("express");
// const cors = require("cors");

// const { pool, connectDB } = require("./config/db");

// const appointmentRoutes = require("./routes/appointmentRoutes");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// // Middleware
// app.use(cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:5173"
// }));

// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true }));

// // Health Check
// app.get("/api/health", async (req, res) => {
//     try {
//         await pool.query("SELECT 1");

//         res.json({
//             success: true,
//             message: "Server and Database are running"
//         });

//     } catch (error) {
//         res.status(503).json({
//             success: false,
//             message: "Database unavailable"
//         });
//     }
// });

// // API Routes
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/admin", authRoutes);

// // Invalid Route
// app.use((req, res) => {
//     res.status(404).json({
//         success: false,
//         message: "API route not found"
//     });
// });

// // Start Server
// const PORT = process.env.PORT || 5000;

// async function startServer() {
//     try {
//         await connectDB();

//         app.listen(PORT, () => {
//             console.log(`Server running on http://localhost:${PORT}`);
//         });

//     } catch (error) {
//         console.error("Server startup failed:", error.message);
//         process.exit(1);
//     }
// }

// startServer();






require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { pool, connectDB } = require("./config/db");

const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", async (req, res) => {
    try {
        await pool.query("SELECT 1");

        res.json({
            success: true,
            message: "Server and Database are running"
        });

    } catch (error) {
        res.status(503).json({
            success: false,
            message: "Database unavailable"
        });
    }
});

// API Routes
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", authRoutes);

// Invalid Route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

// Start Server
const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
