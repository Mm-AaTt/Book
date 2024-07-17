import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [bookCover, setBookCover] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setBookCover(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('publisher', publisher);
    formData.append('isbn', isbn);
    formData.append('publication_date', publicationDate);
    formData.append('language', language);
    formData.append('description', description);
    formData.append('genres', JSON.stringify(genres));
    formData.append('book_cover', bookCover);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/author/addbook/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Book added successfully');
      navigate('/author/books');

    console.log(response);  

    } catch (error) {
      alert('Failed to add book');
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="add-book">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} required />
        <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
        <input type="date" placeholder="Publication Date" value={publicationDate} onChange={(e) => setPublicationDate(e.target.value)} required />
        <input type="text" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="text" placeholder="Genres (comma separated)" value={genres} onChange={(e) => setGenres(e.target.value.split(','))} required />
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
