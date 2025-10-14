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
    { keyword: searchQuery, subType: 'CITY' },
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
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Discover East African Destinations</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        {loading && <p className="text-center mt-8">Loading...</p>}
        {error && <p className="text-center mt-8 text-red-600">Error: {error}</p>}
        
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
        
        {!loading && !error && data?.data?.length === 0 && searchQuery && (
          <p className="text-center mt-8 text-gray-600">No destinations found. Try another search.</p>
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
