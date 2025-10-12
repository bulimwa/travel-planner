// src/components/Navbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600">
                East Africa Travel Planner
              </h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/destinations" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/destinations' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              Destinations
            </Link>
            <Link 
              to="/itinerary" 
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === '/itinerary' 
                  ? 'text-primary-600 border-b-2 border-primary-600' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              My Itinerary
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
