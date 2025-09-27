const NASA_API_KEY = import.meta.env.VITE_NASA_API_KEY;
const NASA_BASE_URL = 'https://api.nasa.gov';

export const nasaApi = {
  async getNearEarthObjects(startDate: string, endDate: string) {
    const response = await fetch(
      `${NASA_BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${NASA_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch NEO data');
    return response.json();
  },

  async getAstronomyPictureOfTheDay(date?: string) {
    const dateParam = date ? `&date=${date}` : '';
    const response = await fetch(
      `${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}${dateParam}`
    );
    if (!response.ok) throw new Error('Failed to fetch APOD data');
    return response.json();
  },

  async getSolarFlareData() {
    const response = await fetch(
      `${NASA_BASE_URL}/DONKI/FLR?startDate=2024-01-01&endDate=2025-12-31&api_key=${NASA_API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch solar flare data');
    return response.json();
  }
};