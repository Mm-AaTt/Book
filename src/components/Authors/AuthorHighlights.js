import React from 'react';
import { Link } from 'react-router-dom';

const AuthorHighlights = () => {
  // Sample data for highlighted authors, replace with real data
  const authors = [
    { id: 1, name: 'Author 1' },
    { id: 2, name: 'Author 2' },
    { id: 3, name: 'Author 3' }
  ];

  return (
    <div className="author-highlights">
      {authors.map(author => (
        <div key={author.id} className="author">
          <h3>{author.name}</h3>
          <Link to={`/authors/${author.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default AuthorHighlights;
