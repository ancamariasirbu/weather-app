import "./App.css";
import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar.jsx";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <NavLink to="/" end className="logo">
          luna<span>weather</span>
        </NavLink>
      </footer>
    </div>
  );
}

export default App;
