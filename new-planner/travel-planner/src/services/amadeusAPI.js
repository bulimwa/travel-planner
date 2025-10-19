// src/services/amadeusAPI.js
const AMADEUS_BASE_URL = 'https://test.api.amadeus.com/v1';

class AmadeusAPI {
  constructor() {
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const clientId = import.meta.env.VITE_AMADEUS_CLIENT_ID;
    const clientSecret = import.meta.env.VITE_AMADEUS_CLIENT_SECRET;

    try {
      const response = await fetch(`${AMADEUS_BASE_URL}/security/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
      });

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      return this.accessToken;
    } catch (error) {
      console.error('Error getting Amadeus access token:', error);
      throw error;
    }
  }

  async makeAuthenticatedRequest(url) {
    const token = await this.getAccessToken();
    
    const response = await fetch(url, {
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
    const url = `${AMADEUS_BASE_URL}/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=CITY`;
    return this.makeAuthenticatedRequest(url);
  }

  async getFlightOffers(origin, destination, departureDate, adults = 1) {
    const url = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=${adults}`;
    return this.makeAuthenticatedRequest(url);
  }

  async getHotelOffers(cityCode) {
    const url = `https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}`;
    return this.makeAuthenticatedRequest(url);
  }

  async getCityDetails(cityCode) {
    const url = `${AMADEUS_BASE_URL}/reference-data/locations/cities?keyword=${cityCode}`;
    return this.makeAuthenticatedRequest(url);
  }
}

export default new AmadeusAPI();
