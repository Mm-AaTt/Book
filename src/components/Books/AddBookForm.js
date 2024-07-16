import React, { useState } from 'react';

const AddBookForm = ({ onAddBook }) => {
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [publisher, setPublisher] = useState('');
  const [language, setLanguage] = useState('');
  const [coverImage, setCoverImage] = useState(null); // State for storing selected file
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a FormData object to hold form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('isbn', isbn);
    formData.append('publication_date', publicationDate);
    formData.append('publisher', publisher);
    formData.append('language', language);
    formData.append('description', description);
    if (coverImage) {
      formData.append('cover_image_url', coverImage);
    }

    // Call the parent component's function to handle adding the book
    onAddBook(formData);

    // Clear form fields after submission
    setTitle('');
    setIsbn('');
    setPublicationDate('');
    setPublisher('');
    setLanguage('');
    setCoverImage(null);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        required
      />
      <input
        type="date"
        placeholder="Publication Date"
        value={publicationDate}
        onChange={(e) => setPublicationDate(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Publisher"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setCoverImage(e.target.files[0])}
        accept="image/*"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBookForm;
