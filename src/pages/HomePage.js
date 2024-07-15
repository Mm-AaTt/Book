// src/pages/HomePage.js
/* src/assets/styles/HomePage.css */

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/HomePage.css'; // Create and import a CSS file for styling
import FeaturedBooks from '../components/Books/FeaturedBooks';
import AuthorHighlights from '../components/Authors/AuthorHighlights';

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to SaphooMhicha</h1>
        <p>Your ultimate book tracking and reading companion.</p>
      </header>
      
      <section className="homepage-featured">
        <h2>Featured Books</h2>
        <FeaturedBooks />
      </section>
      
      <section className="homepage-authors">
        <h2>Author Highlights</h2>
        <AuthorHighlights />
      </section>
      
      <section className="homepage-links">
        <Link to="/books" className="homepage-link">Browse Books</Link>
        <Link to="/authors" className="homepage-link">Meet the Authors</Link>
        <Link to="/profile" className="homepage-link">Your Profile</Link>
      </section>
    </div>
  );
};

export default HomePage;
