// src/components/ItineraryItem.jsx
import React from 'react';

const ItineraryItem = ({ item, onRemove }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600">{item.address?.countryName || item.countryCode}</p>
      </div>
      <button
        onClick={onRemove}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
      >
        Remove
      </button>
    </div>
  );
};

export default ItineraryItem;
