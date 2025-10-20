// src/services/weatherAPI.js
class WeatherAPI {
  constructor() {
    this.apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getWeatherByCity(cityName, countryCode = '') {
    try {
      const query = countryCode ? `${cityName},${countryCode}` : cityName;
      const response = await fetch(
        `${this.baseUrl}/weather?q=${encodeURIComponent(query)}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weather:', error);
      throw error;
    }
  }

  async getWeatherForecast(cityName, countryCode = '') {
    try {
      const query = countryCode ? `${cityName},${countryCode}` : cityName;
      const response = await fetch(
        `${this.baseUrl}/forecast?q=${encodeURIComponent(query)}&appid=${this.apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`Weather forecast API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching weather forecast:', error);
      throw error;
    }
  }
}

export default new WeatherAPI();
