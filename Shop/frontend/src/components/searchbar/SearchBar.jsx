import React, { useContext, useState } from 'react';
import './searchbar.css'
import { GeneralContext } from '../../App';
function SearchBar() {
  const { query, setQuery } = useContext(GeneralContext)

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setQuery(query);
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
