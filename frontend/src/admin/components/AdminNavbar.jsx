
import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  const admin = JSON.parse(
    localStorage.getItem("adminData") || "{}"
  );

  return (
    <nav className="admin-navbar">
      <h5 className="mb-0">Admin Dashboard</h5>

      <div className="d-flex align-items-center">
        <span className="mr-3">
          Vishal Jagtap
          {/* {admin.username || "Admin"} */}
        </span>

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={logout}
        >
          <i className="bi bi-box-arrow-right mr-1"></i>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default AdminNavbar;
