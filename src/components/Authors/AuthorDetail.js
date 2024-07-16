import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuthorDetail = () => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newBook, setNewBook] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [editBookTitle, setEditBookTitle] = useState('');
  const authorId = localStorage.getItem('authorId'); // Retrieve authorId from localStorage

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/author/${authorId}/books`);
        setAuthor(response.data.author);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred');
        setLoading(false);
      }
    };

    fetchAuthor();
  }, [authorId]);

  const handleAddBook = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/author/addbook`, {
        title: newBook,
        authorId,
      });
      setAuthor(prevAuthor => ({
        ...prevAuthor,
        books: [...prevAuthor.books, response.data.book],
      }));
      setNewBook('');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while adding the book');
    }
  };

  const handleEditBook = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/author/editbook/${editingBook}`, {
        title: editBookTitle,
      });
      setAuthor(prevAuthor => ({
        ...prevAuthor,
        books: prevAuthor.books.map(book =>
          book._id === editingBook ? response.data.book : book
        ),
      }));
      setEditingBook(null);
      setEditBookTitle('');
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while editing the book');
    }
  };

  if (loading) return <p>Loading author details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!author) return <p>No author details found.</p>;

  return (
    <div>
      <h2>Author Details</h2>
      <p><strong>Name:</strong> {author.name}</p>
      <p><strong>Books Written:</strong> {author.books.map(book => (
        <div key={book._id}>
          {editingBook === book._id ? (
            <div>
              <input
                type="text"
                value={editBookTitle}
                onChange={(e) => setEditBookTitle(e.target.value)}
              />
              <button onClick={handleEditBook}>Save</button>
              <button onClick={() => setEditingBook(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              {book.title}
              <button onClick={() => {
                setEditingBook(book._id);
                setEditBookTitle(book.title);
              }}>Edit</button>
            </div>
          )}
        </div>
      ))}
      </p>
      <div>
        <h3>Add New Book</h3>
        <input
          type="text"
          value={newBook}
          onChange={(e) => setNewBook(e.target.value)}
        />
        <button onClick={handleAddBook}>Add Book</button>
      </div>
    </div>
  );
};

export default AuthorDetail;
