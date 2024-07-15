import React from 'react';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed: npm install react-router-dom
import '../assets/styles/Navbar.css'; // Create and import a CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">SaphooMhicha</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Books</Link></li>
        <li><Link to="/authors">Authors</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
      <div className="navbar-auth">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
