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

    const response = await fetch(`${this.baseUrl}/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_AMADEUS_API_KEY}&client_secret=${import.meta.env.VITE_AMADEUS_API_SECRET}`
    });

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

  // Search destinations in East Africa
  async searchDestinations(keyword) {
    const eastAfricaCountries = ['KE', 'TZ', 'UG', 'RW', 'BI', 'ET', 'SS', 'DJ', 'ER', 'SO'];
    const countryParams = eastAfricaCountries.map(country => `countryCode=${country}`).join('&');
    
    return this.makeRequest('/reference-data/locations', {
      keyword,
      subType: 'CITY',
      ...Object.fromEntries(eastAfricaCountries.map(country => ['countryCode', country]))
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
