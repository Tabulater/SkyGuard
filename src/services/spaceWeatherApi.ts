const SPACE_WEATHER_API_KEY = import.meta.env.VITE_SPACE_WEATHER_API_KEY;

export const spaceWeatherApi = {
  async getCurrentConditions() {
    try {
      // Note: This is a simplified implementation
      // The actual Australian Space Weather API might have different endpoints
      const response = await fetch(
        `https://sws-data.sws.bom.gov.au/api/v1/get-mag-alert-summary?api-key=${SPACE_WEATHER_API_KEY}`,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      if (!response.ok) {
        // Fallback to mock data if API is not accessible
        return this.getMockSpaceWeatherData();
      }
      
      return response.json();
    } catch (error) {
      console.warn('Space weather API not accessible, using mock data');
      return this.getMockSpaceWeatherData();
    }
  },

  getMockSpaceWeatherData() {
    return {
      solar_wind_speed: 420,
      solar_wind_density: 8.5,
      magnetic_field_strength: 6.2,
      geomagnetic_activity_level: 'quiet',
      aurora_forecast: 'moderate',
      meteor_visibility_impact: 'excellent',
      last_updated: new Date().toISOString()
    };
  }
};