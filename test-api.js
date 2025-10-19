// test-api.js - Simple test script for Amadeus API

const API_KEY = 'G48k8bubPXvpFWTIYxV6g67GG9xP9C0b';
const API_SECRET = 'pH7QAVh6kSSVVhzJ';
const BASE_URL = 'https://test.api.amadeus.com/v1';

async function getAccessToken() {
  const response = await fetch(`${BASE_URL}/security/oauth2/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`
  });

  if (!response.ok) {
    throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function testDestinationSearch(token, keyword) {
  const params = new URLSearchParams({
    keyword,
    subType: 'CITY',
    'page[limit]': 5
  });

  const response = await fetch(`${BASE_URL}/reference-data/locations?${params}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

async function runTests() {
  try {
    console.log('🔐 Testing Amadeus API Authentication...');
    const token = await getAccessToken();
    console.log('✅ Authentication successful!');

    console.log('\n🔍 Testing destination search for "Paris"...');
    const parisResults = await testDestinationSearch(token, 'Paris');
    console.log(`✅ Found ${parisResults.data?.length || 0} destinations for Paris`);
    
    if (parisResults.data?.length > 0) {
      console.log('📍 Sample result:', {
        name: parisResults.data[0].name,
        country: parisResults.data[0].address?.countryName,
        iataCode: parisResults.data[0].iataCode
      });
    }

    console.log('\n🔍 Testing destination search for "London"...');
    const londonResults = await testDestinationSearch(token, 'London');
    console.log(`✅ Found ${londonResults.data?.length || 0} destinations for London`);

    if (londonResults.data?.length > 0) {
      console.log('📍 Sample result:', {
        name: londonResults.data[0].name,
        country: londonResults.data[0].address?.countryName,
        iataCode: londonResults.data[0].iataCode
      });
    }

    console.log('\n🎉 All API tests passed successfully!');
    console.log('✅ Your Amadeus API integration is working correctly');

  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
  }
}

runTests();