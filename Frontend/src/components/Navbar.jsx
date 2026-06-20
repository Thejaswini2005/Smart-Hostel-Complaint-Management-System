import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div className="navbar">

      <div className="navbar-left">
        <h2>
          Welcome back, {user?.name || "Student"}!
        </h2>
        <p>Here's what's happening today</p>
      </div>

      <div className="navbar-right">

        

        <div className="navbar-avatar">
          {user?.name
            ?.split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase() || "U"}
        </div>

      </div>

    </div>
  );
};

export default Navbar;