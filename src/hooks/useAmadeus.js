// src/hooks/useAmadeus.js
import { useState, useEffect } from 'react';
import amadeusAPI from '../services/amadeusAPI';

export const useAmadeus = (endpoint, params = {}, shouldFetch = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await amadeusAPI.makeRequest(endpoint, params);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(params), shouldFetch]);

  return { data, loading, error };
};
