import React from 'react';
import { Link } from 'react-router-dom';

const AuthorHighlights = ({ authors }) => {
  if (!authors || !Array.isArray(authors)) {
    return <p>No authors to display</p>;
  }

  return (
    <div className="author-highlights">
      {authors.map(author => (
        <div key={author._id} className="author">
          <h3>{author.name}</h3>
          <Link to={`/authors/${author._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default AuthorHighlights;
