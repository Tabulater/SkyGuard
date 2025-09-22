import React, { useState } from 'react';
import { Camera, Calendar, ExternalLink } from 'lucide-react';
import { AstronomyPicture } from '../types/space';

interface AstronomyPictureCardProps {
  picture: AstronomyPicture;
}

const AstronomyPictureCard: React.FC<AstronomyPictureCardProps> = ({ picture }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition-all duration-300">
      <div className="relative">
        {picture.media_type === 'image' && (
          <div className="relative h-64 overflow-hidden">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-600" />
              </div>
            )}
            <img
              src={picture.url}
              alt={picture.title}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
        )}
        {picture.media_type === 'video' && (
          <div className="h-64 bg-gray-800 flex items-center justify-center">
            <a
              href={picture.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors flex flex-col items-center"
            >
              <ExternalLink className="w-12 h-12 mb-2" />
              <span className="text-sm">Watch Video</span>
            </a>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-white mb-2">{picture.title}</h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(picture.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-4">
          {picture.explanation.substring(0, 150)}...
        </p>

        <div className="flex justify-between items-center">
          {picture.copyright && (
            <span className="text-xs text-gray-500">© {picture.copyright}</span>
          )}
          {picture.hdurl && (
            <a
              href={picture.hdurl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              HD Version
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AstronomyPictureCard;