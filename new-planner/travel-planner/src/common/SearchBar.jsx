// src/components/common/SearchBar.jsx
import React, { useState } from 'react';
import { useDestinations } from '../../hooks/useDestinations';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchDestinations, loading } = useDestinations();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      await searchDestinations(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for destinations (e.g., Paris, Tokyo, New York)"
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
