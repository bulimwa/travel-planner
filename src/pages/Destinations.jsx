// Updated Destinations.jsx
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import DestinationDetails from '../components/DestinationDetails';
import { useAmadeus } from '../hooks/useAmadeus';

const Destinations = ({ onAddToItinerary }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const { data, loading, error } = useAmadeus(
    '/reference-data/locations',
    { keyword: searchQuery, subType: 'CITY', 'page[limit]': 20 },
    !!searchQuery
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleViewDetails = (destination) => {
    setSelectedDestination(destination);
  };

  const handleCloseDetails = () => {
    setSelectedDestination(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Discover Destinations Worldwide</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        {loading && <p className="text-center mt-8">Searching destinations...</p>}
        {error && (
          <div className="text-center mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 mb-2">Error: {error}</p>
            <p className="text-sm text-red-600">Please check your Amadeus API credentials and try again</p>
          </div>
        )}
        
        {searchQuery && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onViewDetails={() => handleViewDetails(destination)}
                onAddToItinerary={onAddToItinerary}
              />
            ))}
          </div>
        )}
        
        {!loading && !error && data?.data?.length === 0 && searchQuery && (
          <p className="text-center mt-8 text-gray-600">No destinations found. Try another search.</p>
        )}
        
        {!searchQuery && (
          <div className="text-center mt-12 p-8 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Search for Destinations</h2>
            <p className="text-blue-600">Enter a city name above to discover amazing destinations with live data from Amadeus API</p>
          </div>
        )}
        
        {selectedDestination && (
          <DestinationDetails
            destination={selectedDestination}
            onClose={handleCloseDetails}
            onAddToItinerary={onAddToItinerary}
          />
        )}
      </div>
    </div>
  );
};

export default Destinations;
