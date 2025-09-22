import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string;
  eventName: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, eventName }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const isActive = timeLeft.days > 0 || timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0;

  if (!isActive) {
    return (
      <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-lg p-4 border border-green-500">
        <div className="flex items-center justify-center text-green-400">
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-bold">🌟 {eventName} is happening now!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg p-4 border border-blue-500">
      <div className="text-center">
        <div className="flex items-center justify-center mb-2 text-blue-400">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Next: {eventName}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-black bg-opacity-30 rounded p-2">
            <div className="text-2xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-xs text-gray-400">Days</div>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-2">
            <div className="text-2xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-xs text-gray-400">Hours</div>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-2">
            <div className="text-2xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-xs text-gray-400">Min</div>
          </div>
          <div className="bg-black bg-opacity-30 rounded p-2">
            <div className="text-2xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-xs text-gray-400">Sec</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;