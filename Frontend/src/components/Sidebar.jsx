import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import {
  RiDashboardLine,
  RiAddLine,
  RiFileListLine,
  RiUserLine,
  RiLogoutCircleLine,
} from "react-icons/ri";

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
          <RiDashboardLine /> Dashboard
        </NavLink>

        <NavLink to="/student/create-complaint">
          <RiAddLine /> Create Complaint
        </NavLink>

        <NavLink to="/student/my-complaints">
          <RiFileListLine /> My Complaints
        </NavLink>

        <NavLink to="/student/profile">
          <RiUserLine /> {user?.role || "Profile"}
        </NavLink>

      </nav>

      <div
        className="logout-btn"
        onClick={handleLogout}
      >
        <RiLogoutCircleLine /> Logout
      </div>

    </div>
  );
};

export default Sidebar;