import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end className="logo">
        luna<span>weather</span>
      </NavLink>

      <div className="pills">
        <NavLink to="/" end className="nav-item">
          Home
        </NavLink>
        <NavLink to="/favorites" className="nav-item favorite">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
