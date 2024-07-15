import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios
import { useParams } from 'react-router-dom'; // Ensure react-router-dom is installed: npm install react-router-dom

const BookDetail = () => {
  const { bookId } = useParams(); // Assumes you're using react-router for routing
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
        setBook(response.data.book);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.response ? error.response.data.error : error.message);
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]);

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>No book details found.</p>;

  return (
    <div>
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Description:</strong> {book.description}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default BookDetail;
