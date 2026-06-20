import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";

const WardenSidebar = () => {
const navigate = useNavigate();

const user =
JSON.parse(localStorage.getItem("user")) || {};

const handleLogout = () => {
localStorage.removeItem("token");
localStorage.removeItem("role");
localStorage.removeItem("user");

navigate("/login");


};

return ( <div className="sidebar">


  <div className="sidebar-top">
    <h2 className="logo">🏢 HostelCare</h2>
    <p>Warden Panel</p>
  </div>

  <nav className="sidebar-nav">

    <NavLink to="/warden/dashboard">
      📊 Dashboard
    </NavLink>

    <NavLink to="/warden/complaints">
      📋 Manage Complaints
    </NavLink>

    <NavLink to="/warden/profile">
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

export default WardenSidebar;
