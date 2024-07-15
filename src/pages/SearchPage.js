import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you use axios for HTTP requests
import '../assets/styles/SearchPage.css'; // Ensure the path matches your actual CSS file

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch search results when searchTerm changes
    const fetchSearchResults = async () => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`/api/search?q=${encodeURIComponent(searchTerm)}`); // Replace with your API endpoint
        setSearchResults(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results. Please try again.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Trigger search when form is submitted
    // Optionally, you can handle search here directly if needed
    // fetchSearchResults();
  };

  return (
    <div className="search-page">
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="search-results">
        {searchResults.map((result) => (
          <div key={result.id} className="search-result">
            {/* Display search result details */}
            <p>{result.title}</p>
            {/* Add more details as needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
