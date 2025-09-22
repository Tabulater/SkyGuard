import React from 'react';
import { Wind, Zap, Shield, Eye } from 'lucide-react';
import { SpaceWeatherData } from '../types/space';

interface SpaceWeatherPanelProps {
  data: SpaceWeatherData;
}

const SpaceWeatherPanel: React.FC<SpaceWeatherPanelProps> = ({ data }) => {
  const getActivityColor = (level: string) => {
    switch (level) {
      case 'quiet': return 'text-green-400';
      case 'unsettled': return 'text-yellow-400';
      case 'active': return 'text-orange-400';
      case 'minor_storm': return 'text-red-400';
      case 'major_storm': return 'text-red-500';
      case 'severe_storm': return 'text-red-600';
      default: return 'text-gray-400';
    }
  };

  const getVisibilityColor = (impact: string) => {
    switch (impact) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'fair': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg border border-indigo-700 p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Zap className="w-5 h-5 mr-2 text-yellow-400" />
        Space Weather Conditions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center">
              <Wind className="w-4 h-4 mr-2 text-blue-400" />
              Solar Wind Speed
            </span>
            <span className="text-white font-mono">{data.solar_wind_speed} km/s</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300 flex items-center">
              <Shield className="w-4 h-4 mr-2 text-purple-400" />
              Magnetic Field
            </span>
            <span className="text-white font-mono">{data.magnetic_field_strength} nT</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Geomagnetic Activity</span>
            <span className={`font-semibold capitalize ${getActivityColor(data.geomagnetic_activity_level)}`}>
              {data.geomagnetic_activity_level.replace('_', ' ')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-300">Aurora Forecast</span>
            <span className={`font-semibold capitalize ${data.aurora_forecast === 'high' ? 'text-green-400' : data.aurora_forecast === 'moderate' ? 'text-yellow-400' : 'text-gray-400'}`}>
              {data.aurora_forecast}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-black bg-opacity-30 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 flex items-center">
            <Eye className="w-4 h-4 mr-2 text-emerald-400" />
            Meteor Visibility Impact
          </span>
          <span className={`font-bold uppercase text-sm ${getVisibilityColor(data.meteor_visibility_impact)}`}>
            {data.meteor_visibility_impact}
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          Current space weather conditions for optimal meteor observation
        </p>
      </div>
    </div>
  );
};

export default SpaceWeatherPanel;