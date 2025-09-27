import { useState, useEffect } from 'react';
import { nasaApi } from '../services/nasaApi';
import { spaceWeatherApi } from '../services/spaceWeatherApi';
import { NearEarthObject, SpaceWeatherData, AstronomyPicture } from '../types/space';

export const useSpaceData = () => {
  const [nearEarthObjects, setNearEarthObjects] = useState<NearEarthObject[]>([]);
  const [spaceWeather, setSpaceWeather] = useState<SpaceWeatherData | null>(null);
  const [astronomyPicture, setAstronomyPicture] = useState<AstronomyPicture | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get date range for NEO data (today +/- 3 days)
        const today = new Date();
        const threeDaysAgo = new Date(today);
        threeDaysAgo.setDate(today.getDate() - 3);
        const threeDaysLater = new Date(today);
        threeDaysLater.setDate(today.getDate() + 3);

        const startDate = threeDaysAgo.toISOString().split('T')[0];
        const endDate = threeDaysLater.toISOString().split('T')[0];

        // Fetch all data in parallel
        const [neoData, weatherData, apodData] = await Promise.allSettled([
          nasaApi.getNearEarthObjects(startDate, endDate),
          spaceWeatherApi.getCurrentConditions(),
          nasaApi.getAstronomyPictureOfTheDay()
        ]);

        // Process NEO data
        if (neoData.status === 'fulfilled') {
          const objects: NearEarthObject[] = [];
          Object.values(neoData.value.near_earth_objects).forEach((dayObjects: any) => {
            objects.push(...dayObjects);
          });
          // Sort by closest approach date and take first 6
          objects.sort((a, b) => 
            new Date(a.close_approach_data[0].close_approach_date).getTime() - 
            new Date(b.close_approach_data[0].close_approach_date).getTime()
          );
          setNearEarthObjects(objects.slice(0, 6));
        }

        // Process space weather data
        if (weatherData.status === 'fulfilled') {
          setSpaceWeather(weatherData.value);
        }

        // Process APOD data
        if (apodData.status === 'fulfilled') {
          setAstronomyPicture(apodData.value);
        }

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    nearEarthObjects,
    spaceWeather,
    astronomyPicture,
    loading,
    error
  };
};