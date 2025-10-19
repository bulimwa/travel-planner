// src/App.jsx
import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import Header from './components/layout/Header';
import SearchBar from './components/common/SearchBar';
import DestinationList from './components/destinations/DestinationList';
import DestinationDetails from './components/destinations/DestinationDetails';
import ItineraryPlanner from './components/itinerary/ItineraryPlanner';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('search');
  const [selectedDestination, setSelectedDestination] = useState(null);

  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {currentView === 'search' && (
            <>
              <div className="mb-8">
                <SearchBar />
              </div>
              <DestinationList 
                onSelectDestination={(destination) => {
                  setSelectedDestination(destination);
                  setCurrentView('details');
                }}
              />
            </>
          )}
          
          {currentView === 'details' && selectedDestination && (
            <DestinationDetails 
              destination={selectedDestination}
              onBack={() => setCurrentView('search')}
              onPlanTrip={() => setCurrentView('itinerary')}
            />
          )}
          
          {currentView === 'itinerary' && (
            <ItineraryPlanner 
              onBack={() => setCurrentView('details')}
            />
          )}
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
