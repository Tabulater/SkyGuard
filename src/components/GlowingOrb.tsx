import React from 'react';

interface GlowingOrbProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const GlowingOrb: React.FC<GlowingOrbProps> = ({ 
  size = 'md', 
  color = 'blue', 
  intensity = 'medium',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const colorClasses = {
    blue: 'bg-blue-400 shadow-blue-400',
    purple: 'bg-purple-400 shadow-purple-400',
    green: 'bg-green-400 shadow-green-400',
    orange: 'bg-orange-400 shadow-orange-400',
    red: 'bg-red-400 shadow-red-400'
  };

  const intensityClasses = {
    low: 'shadow-sm',
    medium: 'shadow-lg',
    high: 'shadow-2xl'
  };

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]} 
        ${intensityClasses[intensity]}
        rounded-full animate-pulse
        ${className}
      `}
      style={{
        boxShadow: `0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor`
      }}
    />
  );
};

export default GlowingOrb;