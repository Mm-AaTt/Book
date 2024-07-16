import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({});
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [bookCover, setBookCover] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/author/book/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBook(response.data);
        setTitle(response.data.title);
        setPublisher(response.data.publisher);
        setIsbn(response.data.isbn);
        setPublicationDate(response.data.publication_date);
        setLanguage(response.data.language);
        setDescription(response.data.description);
        setGenres(response.data.genres);
      } catch (error) {
        setError(error.response?.data?.error || 'An error occurred while fetching book details');
      }
    };

    fetchBook();
  }, [id]);

  const handleFileChange = (e) => {
    setBookCover(e.target.files[0]);
  };

  const handleEditBook = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('publisher', publisher);
    formData.append('isbn', isbn);
    formData.append('publication_date', publicationDate);
    formData.append('language', language);
    formData.append('description', description);
    formData.append('genres', genres);
    if (bookCover) formData.append('book_cover', bookCover);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/author/editbook/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Book updated successfully!');
      setError(null);
      navigate(`/author/books`);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred while updating the book');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h2>Edit Book</h2>
      <form onSubmit={handleEditBook}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Publisher:</label>
          <input type="text" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
        </div>
        <div>
          <label>ISBN:</label>
          <input type="text" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        </div>
        <div>
          <label>Publication Date:</label>
          <input type="date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
        </div>
        <div>
          <label>Language:</label>
          <input type="text" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Genres:</label>
          <input type="text" value={genres} onChange={(e) => setGenres(e.target.value.split(','))} required />
        </div>
        <div>
          <label>Book Cover:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Update Book</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default EditBook;
