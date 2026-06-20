import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="sidebar">

      <div className="sidebar-top">
        <h2 className="logo">🏢 HostelCare</h2>
        <p>Student</p>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/student/dashboard">
          📊 Dashboard
        </NavLink>

        <NavLink to="/student/create-complaint">
          + Create Complaint
        </NavLink>

        <NavLink to="/student/my-complaints">
          📋 My Complaints
        </NavLink>

        <NavLink to="/student/profile">
          👤 {user?.role || "Profile"}
        </NavLink>

      </nav>

      <div
        className="logout-btn"
        onClick={handleLogout}
      >
        🚪 Logout
      </div>

    </div>
  );
};

export default Sidebar;