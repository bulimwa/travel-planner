// src/components/DestinationDetails.jsx
import React from 'react';

const DestinationDetails = ({ destination, onClose, onAddToItinerary }) => {
  // For now, we'll display basic details. We can expand this with more data from the API.
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{destination.name}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <p className="text-gray-600 mb-4">{destination.address?.countryName}</p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <p>More details about the destination would go here, including attractions, flights, hotels, etc.</p>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => onAddToItinerary(destination)}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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
