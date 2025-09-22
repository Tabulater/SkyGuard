import React, { useState } from 'react';
import { Calendar, Star, Eye, Moon, MapPin, Clock, TrendingUp } from 'lucide-react';
import { MeteorShower } from '../types/space';
import GlowingOrb from './GlowingOrb';
import CountdownTimer from './CountdownTimer';

interface EnhancedMeteorShowerCardProps {
  shower: MeteorShower;
  isUpcoming?: boolean;
}

const EnhancedMeteorShowerCard: React.FC<EnhancedMeteorShowerCardProps> = ({ shower, isUpcoming = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
        className={`w-4 h-4 transition-all duration-300 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current scale-110' : 'text-gray-600'
        }`}
      />
    ));
  };

  const getIntensityColor = (zhr: number) => {
    if (zhr >= 80) return 'from-red-500 to-orange-500';
    if (zhr >= 50) return 'from-orange-500 to-yellow-500';
    if (zhr >= 25) return 'from-yellow-500 to-green-500';
    return 'from-green-500 to-blue-500';
  };

  return (
    <div 
      className={`relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700 p-6 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer ${
        isUpcoming ? 'ring-2 ring-blue-500 ring-opacity-50 shadow-blue-500/20 shadow-2xl' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing orbs */}
      <div className="absolute top-4 right-4 flex space-x-2">
        <GlowingOrb size="sm" color="blue" intensity="medium" />
        <GlowingOrb size="sm" color="purple" intensity="low" />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-xl font-bold text-white">{shower.name}</h3>
            {isUpcoming && (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                Coming Soon
              </span>
            )}
          </div>
          <div className={`w-16 h-2 rounded-full bg-gradient-to-r ${getIntensityColor(shower.zhr)}`} />
        </div>

        {isUpcoming && (
          <div className="mb-4">
            <CountdownTimer targetDate={shower.peak_date} eventName={shower.name} />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex items-center text-gray-300 hover:text-white transition-colors">
            <Calendar className="w-4 h-4 mr-3 text-blue-400" />
            <span className="text-sm font-medium">Peak: {new Date(shower.peak_date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>

          <div className="flex items-center text-gray-300 hover:text-white transition-colors">
            <MapPin className="w-4 h-4 mr-3 text-purple-400" />
            <span className="text-sm">Radiant: {shower.radiant}</span>
          </div>

          <div className="flex items-center text-gray-300 hover:text-white transition-colors">
            <TrendingUp className="w-4 h-4 mr-3 text-green-400" />
            <span className="text-sm font-semibold">ZHR: {shower.zhr} meteors/hour</span>
          </div>

          <div className="flex items-center text-gray-300 hover:text-white transition-colors">
            <Moon className={`w-4 h-4 mr-3 ${getMoonPhaseColor(shower.moon_phase_impact)}`} />
            <span className="text-sm">Moon impact: <span className="font-medium capitalize">{shower.moon_phase_impact}</span></span>
          </div>

          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-3 text-yellow-400" />
            <span className="text-sm text-gray-400 mr-2">Visibility:</span>
            <div className="flex space-x-1">
              {getVisibilityStars(shower.visibility_rating)}
            </div>
            <span className="ml-2 text-sm text-white font-bold">{shower.visibility_rating.toFixed(1)}/5</span>
          </div>

          <div className="bg-black bg-opacity-30 rounded-lg p-3 mt-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {shower.description}
            </p>
          </div>

          {isExpanded && (
            <div className="mt-4 space-y-3 animate-fadeIn">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Clock className="w-4 h-4 mr-2 text-blue-400" />
                    <span className="text-sm font-medium text-white">Best Viewing Time</span>
                  </div>
                  <p className="text-xs text-gray-300">2:00 AM - 5:00 AM local time</p>
                </div>
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-3">
                  <div className="flex items-center mb-2">
                    <Eye className="w-4 h-4 mr-2 text-green-400" />
                    <span className="text-sm font-medium text-white">Viewing Conditions</span>
                  </div>
                  <p className="text-xs text-gray-300">Dark sky location recommended</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-white mb-2">Observation Tips</h4>
                <ul className="text-xs text-gray-300 space-y-1">
                  <li>• Allow 20-30 minutes for eyes to adjust to darkness</li>
                  <li>• Look northeast after midnight for best visibility</li>
                  <li>• No telescope needed - use naked eye observation</li>
                </ul>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Active: {shower.active_period}</span>
              <span className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                {isExpanded ? 'Click to collapse' : 'Click for details'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMeteorShowerCard;