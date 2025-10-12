// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch, placeholder = "Search East African destinations..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-6 py-4 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
