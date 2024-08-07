import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h4>E-Learning-System</h4>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/home">Add Courses</Link>
        </li>
        <li>
          <Link to="/drop">Notifications</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
