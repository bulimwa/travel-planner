// src/services/amadeusAPI.js
import { AMADEUS_CONFIG, SEARCH_PARAMS } from '../utils/constants';

class AmadeusAPI {
  constructor() {
    this.baseUrl = AMADEUS_CONFIG.BASE_URL;
    this.token = null;
  }

  async getAccessToken() {
    if (this.token && !this.isTokenExpired()) {
      return this.token;
    }

    const apiKey = import.meta.env.VITE_AMADEUS_API_KEY;
    const apiSecret = import.meta.env.VITE_AMADEUS_API_SECRET;
    
    if (!apiKey || !apiSecret) {
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
    return await this.makeRequest(AMADEUS_CONFIG.ENDPOINTS.LOCATIONS, {
      keyword,
      subType: 'CITY',
      'page[limit]': SEARCH_PARAMS.DEFAULT_LIMIT
    });
  }

  async getPointsOfInterest(latitude, longitude) {
    return this.makeRequest(AMADEUS_CONFIG.ENDPOINTS.POINTS_OF_INTEREST, {
      latitude,
      longitude,
      radius: SEARCH_PARAMS.DEFAULT_RADIUS
    });
  }

  async getActivities(latitude, longitude) {
    return this.makeRequest(AMADEUS_CONFIG.ENDPOINTS.ACTIVITIES, {
      latitude,
      longitude,
      radius: SEARCH_PARAMS.DEFAULT_RADIUS
    });
  }

  async getFlightOffers(origin, destination, departureDate, adults = 1) {
    return this.makeRequest(AMADEUS_CONFIG.ENDPOINTS.FLIGHT_OFFERS, {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
      currencyCode: SEARCH_PARAMS.DEFAULT_CURRENCY,
      max: 10
    });
  }

  async getHotelOffers(cityCode) {
    return this.makeRequest(AMADEUS_CONFIG.ENDPOINTS.HOTELS, {
      cityCode
    });
  }
}

export default new AmadeusAPI();
