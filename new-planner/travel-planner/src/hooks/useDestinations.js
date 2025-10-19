// src/hooks/useDestinations.js
import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import amadeusAPI from '../services/amadeusAPI';

export const useDestinations = () => {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchDestinations = async (keyword) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await amadeusAPI.searchDestinations(keyword);
      dispatch({
        type: 'SET_DESTINATIONS',
        payload: data.data || []
      });
    } catch (err) {
      setError('Failed to search destinations. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFlightOffers = async (origin, destination, departureDate) => {
    try {
      const data = await amadeusAPI.getFlightOffers(origin, destination, departureDate);
      return data.data || [];
    } catch (err) {
      setError('Failed to fetch flight offers.');
      throw err;
    }
  };

  const getHotelOffers = async (cityCode) => {
    try {
      const data = await amadeusAPI.getHotelOffers(cityCode);
      return data.data || [];
    } catch (err) {
      setError('Failed to fetch hotel offers.');
      throw err;
    }
  };

  return {
    destinations: state.destinations,
    loading,
    error,
    searchDestinations,
    getFlightOffers,
    getHotelOffers
  };
};
