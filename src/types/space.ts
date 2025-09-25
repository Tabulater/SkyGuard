export interface NearEarthObject {
  id: string;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number;
      estimated_diameter_max: number;
    };
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproachData[];
  is_sentry_object: boolean;
}

export interface CloseApproachData {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
}

export interface MeteorShower {
  name: string;
  radiant: string;
  active_period: string;
  peak_date: string;
  zhr: number; // Zenithal Hourly Rate
  moon_phase_impact: 'favorable' | 'moderate' | 'poor';
  visibility_rating: number;
  description: string;
}

export interface SpaceWeatherData {
  solar_wind_speed: number;
  solar_wind_density: number;
  magnetic_field_strength: number;
  geomagnetic_activity_level: 'quiet' | 'unsettled' | 'active' | 'minor_storm' | 'major_storm' | 'severe_storm';
  aurora_forecast: 'low' | 'moderate' | 'high';
  meteor_visibility_impact: 'excellent' | 'good' | 'fair' | 'poor';
}

export interface AstronomyPicture {
  copyright?: string;
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}