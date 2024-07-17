// Navbar.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Navbar.css'; // Import your CSS file for styling
import AuthorList from './Authors/AuthorList'; // Import AuthorList component

const Navbar = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));

  useEffect(() => {
    const handleRoleChange = () => {
      setRole(localStorage.getItem('role'));
    };

    // Listen to storage events to update role state
    window.addEventListener('storage', handleRoleChange);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('storage', handleRoleChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setRole(null); // Update local state to reflect logout
    // No need to redirect here; state update should reflect immediately
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink exact to="/" activeClassName="active">SaphooMhicha</NavLink>
      </div>
      <ul className="navbar-links">
        <li><NavLink exact to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/books" activeClassName="active">Books</NavLink></li>
        <li><NavLink to="/authors" activeClassName="active">Authors</NavLink></li>
        <li><NavLink to="/profile" activeClassName="active">Profile</NavLink></li>
        {role === '1' && <li><NavLink to="/author/addbook" activeClassName="active">Add Book</NavLink></li>}
      </ul>
      <div className="navbar-auth">
        {role ? (
          <>
            <NavLink to="/" onClick={handleLogout}>Logout</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </div>
      {/* Include AuthorList component here */}
      <AuthorList />
    </nav>
  );
};

export default Navbar;