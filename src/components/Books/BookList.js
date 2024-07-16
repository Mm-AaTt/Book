import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios';

const BookList = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useParams returns an object of URL parameters
  const { bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/book/latest`);
        setBook(response.data.book);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
      }
    };

    fetchBook();
  }, [bookId]); // Dependency on bookId ensures fetch on parameter change

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!book) return <p>No book found.</p>;

  return (
    <div>
      <h2>Book Details</h2>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Publication Date:</strong> {book.publication_date}</p>
      <p><strong>Publisher:</strong> {book.publisher}</p>
      <p><strong>Language:</strong> {book.language}</p>
      <p><strong>Cover Image URL:</strong> {book.cover_image_url}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Created At:</strong> {book.created_at}</p>
      <p><strong>Updated At:</strong> {book.updated_at}</p>
    </div>
  );
};

export default BookList;
