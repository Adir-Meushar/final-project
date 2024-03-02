import React, { useState } from 'react';
import './searchbar.css'
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button className="search-button" type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchBar;
