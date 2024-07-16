import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const authorId = localStorage.getItem('authorId');
      const token = localStorage.getItem('token');

      if (!authorId || !token) {
        setError('Please log in as an author.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/author/${authorId}/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading books...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!books.length) return <p>No books found.</p>;

  return (
    <div>
      <h2>Your Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Publication Date:</strong> {book.publication_date}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <img src={book.cover_image} alt={book.title} width="100" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorBooks;
