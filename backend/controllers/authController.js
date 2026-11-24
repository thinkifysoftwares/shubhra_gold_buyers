
const { pool } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ADMIN LOGIN
exports.adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        const [admins] = await pool.execute(
            "SELECT * FROM admins WHERE email = ?",
            [email]
        );

        if (admins.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const admin = admins[0];

        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: admin.id,
                email: admin.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d"
            }
        );

        res.json({
            success: true,
            message: "Login successful",
            token,
            admin: {
                id: admin.id,
                username: admin.username,
                email: admin.email
            }
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};


// ADMIN PROFILE
exports.getAdminProfile = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT id, username, email FROM admins WHERE id = ?",
            [req.admin.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch profile"
        });
    }
};
