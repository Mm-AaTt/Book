import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../assets/styles/HomePage.css'; // Create and import a CSS file for styling
import FeaturedBooks from '../components/Books/FeaturedBooks';
import BookList from '../components/Books/BookList'; // Import the BookList component
import AddBookForm from '../components/Books/AddBookForm.js'; // Import the AddBookForm component

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [errorBooks, setErrorBooks] = useState(null);
  const [authenticated, setAuthenticated] = useState(false); // State to track authentication status

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/book/latest`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBooks(response.data.books);
      setLoadingBooks(false);
      setErrorBooks(null);
    } catch (error) {
      setErrorBooks(error.response?.data?.error || 'An error occurred');
      setLoadingBooks(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (formData) => {
    try {
      const token = localStorage.getItem('token'); // Assuming you store the token in localStorage after login
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/book/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Important for handling file uploads
        }
      });
      console.log('Book added successfully:', response.data);
      fetchBooks(); // Refetch the book list to display the new book
    } catch (error) {
      console.error('Error adding book:', error);
      // Handle errors (e.g., show error message to user)
    }
  };

  if (loadingBooks) return <p>Loading...</p>;
  if (errorBooks) return <p style={{ color: 'red' }}>{errorBooks}</p>;

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
      
      <section className="homepage-books">
        <h2>All Books</h2>
        <BookList books={books} />
      </section>
      
      <section className="homepage-add-book">
        <h2>Add a New Book</h2>
        <AddBookForm onAddBook={handleAddBook} />
      </section>
      
      <section className="homepage-links">
        <Link to="/books" className="homepage-link">Browse Books</Link>
        <Link to="/authors" className="homepage-link">Meet the Authors</Link>
        {authenticated ? (
          <Link to="/profile" className="homepage-link">Your Profile</Link>
        ) : (
          <>
            <Link to="/login" className="homepage-link">Login</Link>
            <Link to="/register" className="homepage-link">Register</Link>
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;
