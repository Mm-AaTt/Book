import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const BookDetail = () => {
  const { bookId } = useParams(); // Get bookId from URL params
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Fetch book details using the bookId from URL
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/book/details/${bookId}`);
        console.log(response);
        setBook(response.data.book); // Assuming API response has a 'book' object
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.response ? error.response.data.error : error.message);
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]); // Re-fetch book details whenever bookId changes

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
