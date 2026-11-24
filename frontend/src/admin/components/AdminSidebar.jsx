
import { NavLink } from "react-router-dom";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <div className="sidebar-brand">
        <h5>Shubhra Gold Buyers</h5>
        <small>Admin Panel</small>
      </div>

      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <NavLink to="/admin/dashboard" className="nav-link">
            <i className="bi bi-speedometer2 mr-2"></i>
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/appointments" className="nav-link">
            <i className="bi bi-calendar-check mr-2"></i>
            Appointments
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AdminSidebar;
