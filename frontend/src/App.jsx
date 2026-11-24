
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Branches from "./pages/Branches";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

import AdminLogin from "./admin/pages/AdminLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";
import AppointmentList from "./admin/pages/AppointmentList";

import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/components/ProtectedRoute";

function App() {
  return (
    <Routes>

      {/* Public Website */}
      <Route
        path="/*"
        element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/branches" element={<Branches />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
            <Footer />
          </>
        }
      />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Pages */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="appointments"
            element={<AppointmentList />}
          />

        </Route>
      </Route>

    </Routes>
  );
}

export default App;
