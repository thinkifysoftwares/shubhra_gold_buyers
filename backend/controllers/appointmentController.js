
const { pool } = require("../config/db");

// CREATE APPOINTMENT
exports.createAppointment = async (req, res) => {
    try {
        const {
            full_name,
            email,
            phone,
            state,
            purpose,
            weight,
            appointment_date,
            message
        } = req.body;

        if (!full_name || !email || !phone || !state || !purpose) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        const sql = `
            INSERT INTO appointments
            (full_name, email, phone, state, purpose,
             weight, appointment_date, message)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            full_name,
            email,
            phone,
            state,
            purpose,
            weight || null,
            appointment_date || null,
            message || null
        ]);

        res.status(201).json({
            success: true,
            message: "Appointment submitted successfully",
            appointmentId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to submit appointment"
        });
    }
};


// GET ALL APPOINTMENTS
exports.getAllAppointments = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM appointments ORDER BY created_at DESC"
        );

        res.status(200).json({
            success: true,
            data: rows
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments"
        });
    }
};


// GET SINGLE APPOINTMENT
exports.getAppointmentById = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT * FROM appointments WHERE id = ?",
            [req.params.id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch appointment"
        });
    }
};


// UPDATE APPOINTMENT
exports.updateAppointment = async (req, res) => {
    try {
        const {
            full_name,
            email,
            phone,
            state,
            purpose,
            weight,
            appointment_date,
            message
        } = req.body;

        const [result] = await pool.execute(
            `UPDATE appointments SET
            full_name = ?,
            email = ?,
            phone = ?,
            state = ?,
            purpose = ?,
            weight = ?,
            appointment_date = ?,
            message = ?
            WHERE id = ?`,
            [
                full_name,
                email,
                phone,
                state,
                purpose,
                weight || null,
                appointment_date || null,
                message || null,
                req.params.id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.json({
            success: true,
            message: "Appointment updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update appointment"
        });
    }
};


// UPDATE APPOINTMENT STATUS
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Contacted",
            "Completed",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid appointment status"
            });
        }

        const [result] = await pool.execute(
            "UPDATE appointments SET status = ? WHERE id = ?",
            [status, req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.json({
            success: true,
            message: "Appointment status updated"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update status"
        });
    }
};


// DELETE APPOINTMENT
exports.deleteAppointment = async (req, res) => {
    try {
        const [result] = await pool.execute(
            "DELETE FROM appointments WHERE id = ?",
            [req.params.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            });
        }

        res.json({
            success: true,
            message: "Appointment deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete appointment"
        });
    }
};


// DASHBOARD STATISTICS

// exports.getDashboardStats = async (req, res) => {
//     try {
//         const [rows] = await pool.execute(`
//             SELECT
//                 COUNT(*) AS total,
//                 SUM(status = 'Pending') AS pending,
//                 SUM(status = 'Contacted') AS contacted,
//                 SUM(status = 'Completed') AS completed,
//                 SUM(status = 'Cancelled') AS cancelled
//             FROM appointments
//         `);

//         res.json({
//             success: true,
//             data: rows[0]
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch dashboard statistics"
//         });
//     }
// };



// DASHBOARD STATISTICS
exports.getDashboardStats = async (req, res) => {
    try {
        const [rows] = await pool.execute(`
            SELECT
                COUNT(*) AS total,
                COALESCE(SUM(status = 'Pending'), 0) AS pending,
                COALESCE(SUM(status = 'Contacted'), 0) AS contacted,
                COALESCE(SUM(status = 'Completed'), 0) AS completed,
                COALESCE(SUM(status = 'Cancelled'), 0) AS cancelled
            FROM appointments
        `);

        res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        console.error("Dashboard Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard statistics"
        });
    }
};









// GET ALL APPOINTMENTS WITH SEARCH AND FILTER
exports.getAllAppointments = async (req, res) => {
    try {
        const { search = "", status = "" } = req.query;

        let sql = "SELECT * FROM appointments WHERE 1=1";
        const values = [];

        // Search by name, email or phone
        if (search.trim()) {
            sql += ` AND (
                full_name LIKE ? OR
                email LIKE ? OR
                phone LIKE ?
            )`;

            const keyword = `%${search.trim()}%`;

            values.push(keyword, keyword, keyword);
        }

        // Filter by status
        if (status) {
            const allowedStatuses = [
                "Pending",
                "Contacted",
                "Completed",
                "Cancelled"
            ];

            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid status filter"
                });
            }

            sql += " AND status = ?";
            values.push(status);
        }

        sql += " ORDER BY created_at DESC";

        const [rows] = await pool.execute(sql, values);

        res.status(200).json({
            success: true,
            total: rows.length,
            data: rows
        });

    } catch (error) {
        console.error("Get Appointments Error:", error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch appointments"
        });
    }
};
