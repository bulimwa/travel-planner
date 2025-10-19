// src/components/AmadeusTest.jsx
import React, { useState } from 'react';
import amadeusAPI from '../services/amadeusAPI';

const AmadeusTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testAPI = async () => {
    setLoading(true);
    setTestResult('Testing Amadeus API...');
    
    try {
      // Test authentication
      const token = await amadeusAPI.getAccessToken();
      setTestResult(prev => prev + '\n✓ Authentication successful');
      
      // Test destination search
      const destinations = await amadeusAPI.searchDestinations('Nairobi');
      setTestResult(prev => prev + `\n✓ Found ${destinations.data?.length || 0} destinations`);
      
      if (destinations.data?.length > 0) {
        setTestResult(prev => prev + `\n✓ Sample destination: ${destinations.data[0].name}`);
      }
      
    } catch (error) {
      setTestResult(prev => prev + `\n✗ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Amadeus API Test</h3>
      <button 
        onClick={testAPI}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test API'}
      </button>
      {testResult && (
        <pre className="mt-4 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">
          {testResult}
        </pre>
      )}
    </div>
  );
};

export default AmadeusTest;