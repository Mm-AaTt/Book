import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed: npm install axios

const AuthorList = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/authors');
        setAuthors(response.data.authors);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.response.data.error);
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (authors.length === 0) return <p>No authors found.</p>;

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {authors.map(author => (
          <li key={author._id}>
            <p><strong>Name:</strong> {author.name}</p>
            <p><strong>Books Written:</strong> {author.booksWritten.join(', ')}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorList;
