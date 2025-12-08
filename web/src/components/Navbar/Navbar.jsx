import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-home">
        <NavLink to="/" className="nav-item">
          Home
        </NavLink>
      </div>

      <div className="nav-favorites">
        <NavLink to="/favorites" className="nav-item favorite">
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
