import { useEffect, useState } from "react";
import api from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const response = await api.get("/appointments/stats");

        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (err) {
        console.error("Dashboard Error:", err);

        setError(
          err.response?.data?.message ||
          "Unable to load dashboard"
        );
      }
    };

    getDashboard();
  }, []);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!stats) {
    return <p>Loading dashboard...</p>;
  }

  return (
    <div>
      <h3 className="mb-4">Dashboard Overview</h3>

      <div className="row">

        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-2">
                Total Appointments
              </p>
              <h2>{stats.total ?? 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-2">Pending</p>
              <h2>{stats.pending ?? 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-2">Contacted</p>
              <h2>{stats.contacted ?? 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-2">Completed</p>
              <h2>{stats.completed ?? 0}</h2>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-xl-3 mb-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <p className="text-muted mb-2">Cancelled</p>
              <h2>{stats.cancelled ?? 0}</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
