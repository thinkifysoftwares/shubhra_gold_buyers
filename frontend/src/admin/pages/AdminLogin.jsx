
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/admin/login", {
        email,
        password
      });

      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem(
        "adminData",
        JSON.stringify(response.data.admin)
      );

      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="container">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">

                <div className="text-center mb-4">
                  <h3 className="font-weight-bold">
                    Shubhra Gold Buyers
                  </h3>
                  <p className="text-muted">
                    Admin Panel Login
                  </p>
                </div>

                {error && (
                  <div className="alert alert-danger">
                    {error}
                  </div>
                )}

                <form onSubmit={handleLogin}>
                  <div className="form-group mb-3">
                    <label>Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group mb-4">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark btn-block"
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Login"}
                  </button>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
