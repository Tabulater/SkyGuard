import React from 'react';
import { AlertTriangle, ExternalLink, Ruler, Zap } from 'lucide-react';
import { NearEarthObject } from '../types/space';

interface NearEarthObjectCardProps {
  neo: NearEarthObject;
}

const NearEarthObjectCard: React.FC<NearEarthObjectCardProps> = ({ neo }) => {
  const closestApproach = neo.close_approach_data[0];
  const diameterKm = (neo.estimated_diameter.kilometers.estimated_diameter_min + 
                     neo.estimated_diameter.kilometers.estimated_diameter_max) / 2;

  const formatDistance = (km: string) => {
    const distance = parseFloat(km);
    if (distance > 1000000) {
      return `${(distance / 1000000).toFixed(2)}M km`;
    }
    return `${distance.toLocaleString()} km`;
  };

  const formatVelocity = (kmh: string) => {
    return `${parseFloat(kmh).toLocaleString()} km/h`;
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border p-4 hover:border-blue-500 transition-all duration-300 ${
      neo.is_potentially_hazardous_asteroid ? 'border-red-500 border-2' : 'border-gray-700'
    }`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-semibold text-white text-sm truncate mr-2">
          {neo.name.replace(/[()]/g, '')}
        </h4>
        {neo.is_potentially_hazardous_asteroid && (
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
        )}
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 flex items-center">
            <Ruler className="w-3 h-3 mr-1" />
            Diameter
          </span>
          <span className="text-white font-mono">{diameterKm.toFixed(1)} km</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400 flex items-center">
            <Zap className="w-3 h-3 mr-1" />
            Velocity
          </span>
          <span className="text-white font-mono">
            {formatVelocity(closestApproach.relative_velocity.kilometers_per_hour)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">Miss Distance</span>
          <span className="text-white font-mono">
            {formatDistance(closestApproach.miss_distance.kilometers)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">Closest Approach</span>
          <span className="text-white font-mono">
            {new Date(closestApproach.close_approach_date).toLocaleDateString()}
          </span>
        </div>

        {neo.is_potentially_hazardous_asteroid && (
          <div className="pt-2 border-t border-red-800">
            <span className="text-red-400 text-xs font-semibold">⚠️ Potentially Hazardous</span>
          </div>
        )}

        <a
          href={neo.nasa_jpl_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center mt-3 text-blue-400 hover:text-blue-300 transition-colors"
        >
          <ExternalLink className="w-3 h-3 mr-1" />
          <span className="text-xs">View Details</span>
        </a>
      </div>
    </div>
  );
};

export default NearEarthObjectCard;