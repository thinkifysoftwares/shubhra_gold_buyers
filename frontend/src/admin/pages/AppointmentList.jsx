
import { useEffect, useState } from "react";
import api from "../../services/api";

function AppointmentList() {

    const [appointments, setAppointments] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/appointments", {
                params: {
                    search: search.trim(),
                    status: status
                }
            });

            if (response.data.success) {
                setAppointments(response.data.data);
            }

        } catch (err) {
            console.error("Appointment Error:", err);
            setError(
                err.response?.data?.message ||
                "Unable to fetch appointments"
            );

        } finally {
            setLoading(false);
        }
    };



    const updateStatus = async (id, newStatus) => {
        try {
            await api.patch(`/appointments/${id}/status`, {
                status: newStatus
            });

            // Update UI immediately
            setAppointments((prev) =>
                prev.map((item) =>
                    item.id === id
                        ? { ...item, status: newStatus }
                        : item
                )
            );

        } catch (error) {
            console.error("Status Update Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update appointment status"
            );

            fetchAppointments();
        }
    };


    useEffect(() => {
        const timer = setTimeout(() => {
            fetchAppointments();
        }, 400);

        return () => clearTimeout(timer);
    }, [search, status]);


    const deleteAppointment = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this appointment?"
        );

        if (!confirmDelete) return;

        try {
            const response = await api.delete(`/appointments/${id}`);

            if (response.data.success) {
                setAppointments((prev) =>
                    prev.filter((item) => item.id !== id)
                );

                alert("Appointment deleted successfully!");
            }
        } catch (error) {
            console.error("Delete Appointment Error:", error);

            alert(
                error.response?.data?.message ||
                "Failed to delete appointment."
            );
        }
    };

    return (
        <div className="container-fluid">

            <h3 className="mb-4">Customer Appointments</h3>

            {/* Search and Filter */}
            <div className="card shadow-sm border-0 mb-4">
                <div className="card-body">

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <label className="form-label">
                                Search Customer
              </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search by name, email or mobile number..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">
                                Filter by Status
              </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>

                        <div className="col-md-2 mb-3 d-flex align-items-end">
                            <button
                                className="btn btn-secondary w-100"
                                onClick={() => {
                                    setSearch("");
                                    setStatus("");
                                }}
                            >
                                Clear
              </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Appointment Table */}
            <div className="card shadow-sm border-0">
                <div className="card-body">

                    <div className="d-flex justify-content-between mb-3">
                        <h5>Appointment Records</h5>

                        <span className="badge">
                            Total: {appointments.length} Records
                        </span>
                    </div>

                    {error && (
                        <div className="alert alert-danger">{error}</div>
                    )}

                    {loading ? (
                        <p>Loading appointments...</p>
                    ) : (
                            <div className="table-responsive">

                                <table className="table table-bordered table-hover">

                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Customer Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>State</th>
                                            <th>Purpose</th>
                                            <th>Weight</th>
                                            <th>Appointment Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        {appointments.length > 0 ? (
                                            appointments.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.id}</td>
                                                    <td>{item.full_name}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.phone}</td>
                                                    <td>{item.state}</td>
                                                    <td>{item.purpose}</td>
                                                    <td>{item.weight || "-"}</td>
                                                    <td>
                                                        {item.appointment_date
                                                            ? new Date(item.appointment_date)
                                                                .toLocaleDateString("en-IN")
                                                            : "-"}
                                                    </td>
                                                
                                                    <td>
                                                        <select
                                                            className={`form-select form-select-sm ${item.status === "Completed"
                                                                ? "border-success text-success"
                                                                : item.status === "Cancelled"
                                                                    ? "border-danger text-danger"
                                                                    : item.status === "Contacted"
                                                                        ? "border-info text-info"
                                                                        : "border-warning text-dark"
                                                                }`}
                                                            value={item.status || "Pending"}
                                                            onChange={(e) =>
                                                                updateStatus(item.id, e.target.value)
                                                            }
                                                        >
                                                            <option value="Pending">Pending</option>
                                                            <option value="Contacted">Contacted</option>
                                                            <option value="Completed">Completed</option>
                                                            <option value="Cancelled">Cancelled</option>
                                                        </select>
                                                    </td>

                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => deleteAppointment(item.id)}
                                                        >
                                                            <i className="bi bi-trash"></i> Delete
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))
                                        ) : (
                                                <tr>
                                                    <td colSpan="9" className="text-center">
                                                        No appointments found
                      </td>
                                                </tr>
                                            )}

                                    </tbody>

                                </table>

                            </div>
                        )}

                </div>
            </div>

        </div>
    );
}

export default AppointmentList;
