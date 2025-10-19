// src/utils/constants.js
export const AMADEUS_CONFIG = {
  BASE_URL: 'https://test.api.amadeus.com/v1',
  ENDPOINTS: {
    LOCATIONS: '/reference-data/locations',
    POINTS_OF_INTEREST: '/reference-data/locations/pois',
    ACTIVITIES: '/shopping/activities',
    FLIGHT_OFFERS: '/shopping/flight-offers',
    HOTELS: '/reference-data/locations/hotels/by-city'
  }
};

export const SEARCH_PARAMS = {
  DEFAULT_LIMIT: 20,
  DEFAULT_RADIUS: 20,
  DEFAULT_CURRENCY: 'USD'
};
