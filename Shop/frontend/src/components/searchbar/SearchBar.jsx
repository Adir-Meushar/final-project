import React, { useContext, useState } from 'react';
import './searchbar.css'
import { GeneralContext } from '../../App';
import { MdSearch } from "react-icons/md";

function SearchBar() {
  const { search, setSearch } = useContext(GeneralContext)

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(search);
  };

  return (
    <div className="search-bar-box" >
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={handleChange}
          placeholder="Search..."
        />
        <MdSearch className='search-icon' />
    </div>
  );
}

export default SearchBar;
