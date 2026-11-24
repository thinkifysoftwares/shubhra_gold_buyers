
import React, { useState } from "react";
import api from "../services/api";

function AppointmentForm() {

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        state: "",
        purpose: "",
        weight: "",
        appointment_date: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {

            const response = await api.post(
                "/appointments",
                formData
            );

            setSuccess(response.data.message);

            setFormData({
                full_name: "",
                email: "",
                phone: "",
                state: "",
                purpose: "",
                weight: "",
                appointment_date: "",
                message: ""
            });

        } catch (err) {

            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <form id="appointmentForm" onSubmit={handleSubmit}>

            {success && (
                <div className="alert alert-success">
                    {success}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            <div className="form-group mb-3">
                <label className="form-label">
                    Full Name *
                </label>

                <input
                    type="text"
                    name="full_name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.full_name}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">
                    Email Address *
                </label>

                <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">
                    Phone Number *
                </label>

                <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="+91 Enter mobile number"
                    pattern="[0-9+\-\s]{10,15}"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">State *</label>

                <select
                    name="state"
                    className="form-select"
                    value={formData.state}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Your State</option>
                    <option>Maharashtra</option>
                    <option>Gujarat</option>
                    <option>Goa</option>
                    <option>Karnataka</option>
                    <option>Rajasthan</option>
                    <option>Madhya Pradesh</option>
                    <option>Delhi</option>
                    <option>West Bengal</option>
                    <option>Other</option>
                </select>
            </div>

            <div className="form-group mb-3">
                <label className="form-label">
                    Select Purpose *
                </label>

                <select
                    name="purpose"
                    className="form-select"
                    value={formData.purpose}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Your Purpose</option>
                    <option>Sell Old Gold</option>
                    <option>Gold Purity Testing</option>
                    <option>Gold Loan Services</option>
                    <option>Gold Valuation</option>
                    <option>Other Enquiry</option>
                </select>
            </div>

            <div className="form-group mb-3">
                <label className="form-label">
                    Approx. Weight
                </label>

                <input
                    type="text"
                    name="weight"
                    className="form-control"
                    placeholder="Enter approximate weight (in grams)"
                    value={formData.weight}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">
                    Preferred Appointment Date
                </label>

                <input
                    type="date"
                    name="appointment_date"
                    className="form-control"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.appointment_date}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group mb-3">
                <label className="form-label">
                    Comment or Message
                </label>

                <textarea
                    name="message"
                    className="form-control"
                    rows="3"
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className="submit-btn"
                disabled={loading}
            >
                {loading ? "Submitting..." : "Book Appointment"}

                <i className="bi bi-arrow-right ms-2"></i>
            </button>

            <p className="secure-text mt-3">
                <i className="bi bi-shield-check"></i>
                Your information is safe and secure with us.
            </p>

        </form>
    );
}

export default AppointmentForm;
