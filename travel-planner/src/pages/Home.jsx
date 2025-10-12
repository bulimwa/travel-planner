// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const featuredDestinations = [
    {
      name: 'Maasai Mara',
      country: 'Kenya',
      description: 'World-famous wildlife reserve',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801'
    },
    {
      name: 'Zanzibar',
      country: 'Tanzania',
      description: 'Beautiful island paradise',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e'
    },
    {
      name: 'Bwindi Forest',
      country: 'Uganda',
      description: 'Home to mountain gorillas',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306'
    }
  ];

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
            Discover East Africa
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Plan your perfect trip to Kenya, Tanzania, Uganda, Rwanda and beyond with our comprehensive travel planner
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Featured Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredDestinations.map((destination, index) => (
              <div key={index} className="relative group cursor-pointer">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-6">
                  <div>
                    <h3 className="text-white text-xl font-semibold">
                      {destination.name}
                    </h3>
                    <p className="text-gray-200">{destination.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-100">
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
