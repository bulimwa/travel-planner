// src/components/destinations/DestinationCard.jsx
import React from 'react';

const DestinationCard = ({ destination, onSelect }) => {
  const { name, address, iataCode } = destination;

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg"
      onClick={() => onSelect(destination)}
    >
      <div className="h-48 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500">Destination Image</span>
        {/* In production, you would use actual images from Teleport API or other sources */}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 mb-2">{address?.cityName}, {address?.countryName}</p>
        <p className="text-sm text-gray-500">IATA: {iataCode}</p>
        <div className="mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Top Attractions
          </span>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
