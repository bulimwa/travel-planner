// src/components/DestinationCard.jsx
import React from 'react';

const DestinationCard = ({ destination, onViewDetails, onAddToItinerary }) => {
  const eastAfricaImages = {
    'Nairobi': 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7',
    'Dar es Salaam': 'https://images.unsplash.com/photo-1589556183411-27dbe3eadb2a',
    'Kampala': 'https://images.unsplash.com/photo-1558561723-69c2f63d2a73',
    'Kigali': 'https://images.unsplash.com/photo-1589561454226-796a8a8092e4',
    'Arusha': 'https://images.unsplash.com/photo-1573843981269-34afd3d1b0b9',
    'Zanzibar': 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e'
  };

  const getImageUrl = (cityName) => {
    const defaultImage = 'https://images.unsplash.com/photo-1506929562872-bb421503ef21';
    return eastAfricaImages[cityName] || defaultImage;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={getImageUrl(destination.name)} 
        alt={destination.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {destination.name}
        </h3>
        <p className="text-gray-600 mb-4">
          {destination.address?.countryName || destination.countryCode}
        </p>
        
        <div className="flex justify-between items-center">
          <button
            onClick={() => onViewDetails(destination)}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            View Details
          </button>
          <button
            onClick={() => onAddToItinerary(destination)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Add to Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
