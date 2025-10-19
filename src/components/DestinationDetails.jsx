// src/components/DestinationDetails.jsx
import React from 'react';

const DestinationDetails = ({ destination, onClose, onAddToItinerary }) => {
  const getDestinationInfo = (destination) => {
    const cityName = destination.name;
    const countryName = destination.address?.countryName || 'Unknown';
    const query = encodeURIComponent(`${cityName} ${countryName}`);
    
    return {
      description: `${cityName} is a vibrant destination in ${countryName}. Explore this amazing city with its unique culture, attractions, and experiences.`,
      details: [
        destination.iataCode ? `Airport Code: ${destination.iataCode}` : null,
        destination.geoCode ? `Coordinates: ${destination.geoCode.latitude?.toFixed(4)}, ${destination.geoCode.longitude?.toFixed(4)}` : null,
        destination.address?.stateCode ? `State/Region: ${destination.address.stateCode}` : null,
        'Local attractions and points of interest',
        'Cultural sites and landmarks',
        'Dining and entertainment options'
      ].filter(Boolean),
      image: `https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&q=80&auto=format&fit=crop`
    };
  };

  const info = getDestinationInfo(destination);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img src={info.image} alt={destination.name} className="w-full h-64 object-cover rounded-t-lg" />
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 bg-white rounded-full p-2 text-gray-600 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">{destination.name}</h2>
          <p className="text-lg text-gray-600 mb-4">{destination.address?.countryName || destination.countryCode}</p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">About</h3>
            <p className="text-gray-700">{info.description}</p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Destination Details</h3>
            <div className="grid grid-cols-1 gap-2">
              {info.details.map((detail, index) => (
                <div key={index} className="flex items-center text-gray-700">
                  <span className="text-primary-600 mr-2">•</span>
                  {detail}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => onAddToItinerary(destination)}
              className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Add to Itinerary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;