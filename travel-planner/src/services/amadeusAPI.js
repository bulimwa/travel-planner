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

    try {
      const response = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_AMADEUS_API_KEY}&client_secret=${import.meta.env.VITE_AMADEUS_API_SECRET}`
      });

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.status}`);
      }

      const data = await response.json();
      this.token = data.access_token;
      this.tokenExpiry = Date.now() + (data.expires_in * 1000);
      
      return this.token;
    } catch (error) {
      console.error('Error getting Amadeus token:', error);
      throw error;
    }
  }

  // ... rest of the class remains the same
}

export default new AmadeusAPI();
