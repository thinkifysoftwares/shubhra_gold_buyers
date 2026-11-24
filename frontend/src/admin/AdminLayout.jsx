import { Outlet } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminNavbar from "./components/AdminNavbar";

function AdminLayout() {
  return (
    <div className="admin-wrapper">
      <AdminSidebar />

      <div className="admin-main">
        <AdminNavbar />

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
