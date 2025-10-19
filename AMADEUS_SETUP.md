# Amadeus API Setup Guide

## Quick Setup

1. **Get Amadeus API Credentials**
   - Visit [Amadeus for Developers](https://developers.amadeus.com/)
   - Create a free account
   - Create a new app
   - Copy your API Key and API Secret

2. **Configure Environment Variables**
   - Open `.env` file
   - Replace `your_amadeus_api_key_here` with your actual API Key
   - Replace `your_amadeus_api_secret_here` with your actual API Secret

3. **Test the Integration**
   - Add `<AmadeusTest />` component to any page to test the API
   - Or use the search functionality in the Destinations page

## API Features Implemented

- ✅ **Destination Search** - Search for cities worldwide
- ✅ **City Information** - Get basic city details
- ✅ **Attractions Data** - Static attraction data for popular destinations
- ✅ **Image Integration** - Unsplash images for destinations
- 🔄 **Points of Interest** - Ready for API integration
- 🔄 **Activities** - Ready for API integration

## Usage Example

```javascript
import amadeusAPI from './services/amadeusAPI';

// Search destinations
const results = await amadeusAPI.searchDestinations('Nairobi');

// Get flight offers
const flights = await amadeusAPI.getFlightOffers('NBO', 'JFK', '2024-06-01');
```

## Error Handling

The API includes proper error handling for:
- Authentication failures
- Network issues
- Invalid API responses
- Rate limiting

## Rate Limits

Free tier includes:
- 1000 API calls per month
- 10 calls per second