import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h4>E-Learning-System</h4>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Courses</Link>
        </li>
        <li>
          <Link to="/myCourses">My Courses</Link>
        </li>
      </ul>
      <div className="search-login-signup">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </nav>
  );
};

export default Navbar;
