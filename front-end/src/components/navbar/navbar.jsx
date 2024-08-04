import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">E-System</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/courses">Courses</Link>
        </li>
        <li>
          <Link to="/inspiration">My Courses</Link>
        </li>
      </ul>
      <div className="search-login-signup">
        <input type="text" placeholder="Search..." className="search-input" />
      </div>
    </nav>
  );
};

export default Navbar;
