
require("dotenv").config();

const bcrypt = require("bcryptjs");
const { pool } = require("./config/db");

async function createAdmin() {
    try {
        const username = process.env.ADMIN_USERNAME;
        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;

        if (!username || !email || !password) {
            throw new Error("Admin credentials missing in .env");
        }

        if (password.length < 12) {
            throw new Error("Admin password must be at least 12 characters");
        }

        const [existing] = await pool.execute(
            "SELECT id FROM admins WHERE email = ?",
            [email]
        );

        if (existing.length > 0) {
            console.log("Admin account already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await pool.execute(
            `INSERT INTO admins (username, email, password)
             VALUES (?, ?, ?)`,
            [username, email, hashedPassword]
        );

        console.log("Admin account created successfully!");

    } catch (error) {
        console.error("Admin creation failed:", error.message);
        process.exitCode = 1;
    } finally {
        await pool.end();
    }
}

createAdmin();
