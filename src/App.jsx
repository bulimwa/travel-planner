// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import Itinerary from './pages/Itinerary';
import Navbar from './components/Navbar';

function App() {
  const [itinerary, setItinerary] = useState([]);

  const addToItinerary = (item) => {
    setItinerary(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const removeFromItinerary = (id) => {
    setItinerary(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/destinations" 
            element={
              <Destinations 
                onAddToItinerary={addToItinerary}
              />
            } 
          />
          <Route 
            path="/itinerary" 
            element={
              <Itinerary 
                itinerary={itinerary}
                onRemoveItem={removeFromItinerary}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
