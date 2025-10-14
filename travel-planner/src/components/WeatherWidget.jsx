// src/components/WeatherWidget.jsx
import React from 'react';

const WeatherWidget = ({ city }) => {
  // We'll use OpenWeatherMap API to fetch weather, but for now, we'll display a placeholder.
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Weather in {city}</h3>
      <div className="text-center">
        <p className="text-gray-600">Weather information will be displayed here.</p>
      </div>
    </div>
  );
};

export default WeatherWidget;
