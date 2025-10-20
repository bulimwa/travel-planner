// src/services/amadeusAPI.js
class AmadeusAPI {
  constructor() {
    this.baseUrl = 'https://test.api.amadeus.com/v1';
    this.token = null;
  }

  async getAccessToken() {
    if (this.token && !this.isTokenExpired()) {
      return this.token;
    }

    const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
    const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;
    
    if (!apiKey || !apiSecret || apiKey === 'G48k8bubPXvpFWTIYxV6g67GG9xP9C0b') {
      throw new Error('Amadeus API credentials not configured. Please update .env file.');
    }

    const response = await fetch(`${this.baseUrl}/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${apiKey}&client_secret=${apiSecret}`
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    
    return this.token;
  }

  isTokenExpired() {
    return !this.token || Date.now() >= this.tokenExpiry;
  }

  async makeRequest(endpoint, params = {}) {
    const token = await this.getAccessToken();
    const queryString = new URLSearchParams(params).toString();
    
    const response = await fetch(`${this.baseUrl}${endpoint}?${queryString}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async searchDestinations(keyword) {
    try {
      return await this.makeRequest('/reference-data/locations', {
        keyword,
        subType: 'CITY',
        'page[limit]': 10
      });
    } catch (error) {
      // Fallback to mock data if API fails
      return this.getMockDestinations(keyword);
    }
  }

  getMockDestinations(keyword) {
    const mockData = {
      data: [
        {
          id: '1',
          name: 'Nairobi',
          iataCode: 'NBO',
          address: { countryName: 'Kenya', countryCode: 'KE' },
          geoCode: { latitude: -1.2921, longitude: 36.8219 }
        },
        {
          id: '2', 
          name: 'Dar es Salaam',
          iataCode: 'DAR',
          address: { countryName: 'Tanzania', countryCode: 'TZ' },
          geoCode: { latitude: -6.7924, longitude: 39.2083 }
        },
        {
          id: '3',
          name: 'Kampala', 
          iataCode: 'KLA',
          address: { countryName: 'Uganda', countryCode: 'UG' },
          geoCode: { latitude: 0.3476, longitude: 32.5825 }
        }
      ]
    };
    
    if (keyword) {
      mockData.data = mockData.data.filter(dest => 
        dest.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    return mockData;
  }

  async getPointsOfInterest(latitude, longitude) {
    return this.makeRequest('/reference-data/locations/pois', {
      latitude,
      longitude,
      radius: 20
    });
  }

  async getActivities(latitude, longitude) {
    return this.makeRequest('/shopping/activities', {
      latitude,
      longitude,
      radius: 20
    });
  }

  async getFlightOffers(origin, destination, departureDate, adults = 1) {
    return this.makeRequest('/shopping/flight-offers', {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      currencyCode: 'USD',
      max: 10
    });
  }

  async getHotelOffers(cityCode) {
    return this.makeRequest('/reference-data/locations/hotels/by-city', {
      cityCode
    });
  }
}

export default new AmadeusAPI();
