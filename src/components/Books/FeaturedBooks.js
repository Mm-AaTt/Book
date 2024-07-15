import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedBooks = () => {
  // Sample data for featured books, replace with real data
  const books = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' }
  ];

  return (
    <div className="featured-books">
      {books.map(book => (
        <div key={book.id} className="book">
          <h3>{book.title}</h3>
          <p>by {book.author}</p>
          <Link to={`/books/${book.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default FeaturedBooks;
