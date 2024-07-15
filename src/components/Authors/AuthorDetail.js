import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios

const AuthorDetail = ({ authorId }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/authors/${authorId}`);
        setAuthor(response.data.author);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  if (loading) return <p>Loading author details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!author) return <p>No author details found.</p>;

  return (
    <div>
      <h2>Author Details</h2>
      <p><strong>Name:</strong> {author.name}</p>
      <p><strong>Books Written:</strong> {author.booksWritten.join(', ')}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default AuthorDetail;
