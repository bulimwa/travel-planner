// src/pages/Itinerary.jsx
import React from 'react';
import ItineraryItem from '../components/ItineraryItem';

const Itinerary = ({ itinerary, onRemoveItem }) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Travel Itinerary</h1>
        
        {itinerary.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Your itinerary is empty.</p>
            <p className="text-gray-500">Start by adding some destinations from the Destinations page.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {itinerary.map((item) => (
              <ItineraryItem
                key={item.id}
                item={item}
                onRemove={() => onRemoveItem(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Itinerary;
