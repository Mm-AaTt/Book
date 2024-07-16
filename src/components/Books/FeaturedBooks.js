import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FeaturedBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchLatestBooks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/book/latest`);
        setBooks(response.data); // Assuming response.data is an array of books
      } catch (error) {
        console.error('Error fetching latest books:', error);
        // Handle error, e.g., setBooks([]) or show an error message
      }
    };

    fetchLatestBooks();
  }, []);

  return (
    <div className="featured-books">
      {books.map(book => (
        <div key={book.id} className="book">
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
          <Link to={`/books/${book.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBooks;
