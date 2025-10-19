// src/components/DestinationCard.jsx
import React from 'react';

const DestinationCard = ({ destination, onViewDetails, onAddToItinerary }) => {
  const getImageUrl = (cityName, countryName) => {
    // Generate dynamic image URL based on city and country
    const query = encodeURIComponent(`${cityName} ${countryName} city`);
    return `https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80&auto=format&fit=crop`;
  };

  const getLocationInfo = (destination) => {
    const info = [];
    if (destination.iataCode) {
      info.push(`Airport: ${destination.iataCode}`);
    }
    if (destination.geoCode) {
      info.push(`Coordinates: ${destination.geoCode.latitude?.toFixed(2)}, ${destination.geoCode.longitude?.toFixed(2)}`);
    }
    return info.length > 0 ? info : ['Destination information', 'Travel details available'];
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img 
        src={getImageUrl(destination.name, destination.address?.countryName)} 
        alt={`${destination.name}, ${destination.address?.countryName}`}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {destination.name}
        </h3>
        <p className="text-gray-600 mb-2">
          {destination.address?.countryName || destination.countryCode}
          {destination.address?.stateCode && ` • ${destination.address.stateCode}`}
        </p>
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-1">Location Info:</h4>
          <ul className="text-xs text-gray-600">
            {getLocationInfo(destination).slice(0, 2).map((info, index) => (
              <li key={index}>• {info}</li>
            ))}
          </ul>
        </div>
        
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
