import React from 'react';
import { Calendar, Star, Eye, Moon } from 'lucide-react';
import { MeteorShower } from '../types/space';

interface MeteorShowerCardProps {
  shower: MeteorShower;
  isUpcoming?: boolean;
}

const MeteorShowerCard: React.FC<MeteorShowerCardProps> = ({ shower, isUpcoming = false }) => {
  const getMoonPhaseColor = (impact: string) => {
    switch (impact) {
      case 'favorable': return 'text-green-400';
      case 'moderate': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getVisibilityStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
        }`}
      />
    ));
  };

  return (
    <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 p-6 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 ${
      isUpcoming ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-white">{shower.name}</h3>
        {isUpcoming && (
          <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
            Coming Soon
          </span>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-300">
          <Calendar className="w-4 h-4 mr-2 text-blue-400" />
          <span className="text-sm">Peak: {shower.peak_date}</span>
        </div>

        <div className="flex items-center text-gray-300">
          <Star className="w-4 h-4 mr-2 text-purple-400" />
          <span className="text-sm">Radiant: {shower.radiant}</span>
        </div>

        <div className="flex items-center text-gray-300">
          <Eye className="w-4 h-4 mr-2 text-green-400" />
          <span className="text-sm">ZHR: {shower.zhr} meteors/hour</span>
        </div>

        <div className="flex items-center text-gray-300">
          <Moon className={`w-4 h-4 mr-2 ${getMoonPhaseColor(shower.moon_phase_impact)}`} />
          <span className="text-sm">Moon impact: {shower.moon_phase_impact}</span>
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-400 mr-2">Visibility:</span>
          <div className="flex space-x-1">
            {getVisibilityStars(shower.visibility_rating)}
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">
          {shower.description}
        </p>

        <div className="pt-2">
          <span className="text-xs text-gray-500">Active: {shower.active_period}</span>
        </div>
      </div>
    </div>
  );
};

export default MeteorShowerCard;