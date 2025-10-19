// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import AmadeusTest from '../components/AmadeusTest';

const Home = () => {

  const handleSearch = (query) => {
    // Redirect to destinations page with search query
    window.location.href = `/destinations?search=${encodeURIComponent(query)}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Discover the World
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Plan your perfect trip anywhere in the world with real-time data and our comprehensive travel planner
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Plan Your Perfect Trip
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search Destinations</h3>
              <p className="text-gray-600">Discover amazing places worldwide with real-time data from Amadeus API</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Plan Itinerary</h3>
              <p className="text-gray-600">Create and organize your travel plans with our intuitive planner</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✈️</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Travel</h3>
              <p className="text-gray-600">Get flight offers and hotel recommendations for your destinations</p>
            </div>
          </div>
        </div>
      </section>

      {/* API Test Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">API Status</h2>
          <AmadeusTest />
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Need Help Planning?</h2>
          <div className="space-y-4">
            <p className="text-lg">
              Contact us for personalized travel advice
            </p>
            <p className="text-primary-600 font-semibold">
              📞 +254705636228
            </p>
            <p className="text-primary-600 font-semibold">
              ✉️ bulimwawanyoike@gmail.com
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
