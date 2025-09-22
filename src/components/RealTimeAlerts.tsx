import React, { useState, useEffect } from 'react';
import { AlertTriangle, Zap, Eye, Bell, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'danger';
  title: string;
  message: string;
  timestamp: Date;
  priority: 'low' | 'medium' | 'high';
}

const RealTimeAlerts: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate real-time alerts
    const generateAlert = () => {
      const alertTypes = [
        {
          type: 'info' as const,
          title: 'Meteor Shower Peak',
          message: 'Geminids meteor shower reaching peak activity in 2 hours',
          priority: 'medium' as const
        },
        {
          type: 'warning' as const,
          title: 'Solar Storm Alert',
          message: 'Moderate geomagnetic storm may affect meteor visibility',
          priority: 'high' as const
        },
        {
          type: 'success' as const,
          title: 'Optimal Viewing Conditions',
          message: 'Clear skies and new moon phase detected for tonight',
          priority: 'low' as const
        },
        {
          type: 'danger' as const,
          title: 'Near-Earth Object',
          message: 'Large asteroid approaching - closest approach in 6 hours',
          priority: 'high' as const
        }
      ];

      const randomAlert = alertTypes[Math.floor(Math.random() * alertTypes.length)];
      const newAlert: Alert = {
        id: Date.now().toString(),
        ...randomAlert,
        timestamp: new Date()
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
    };

    // Generate initial alert
    generateAlert();

    // Generate new alerts periodically
    const interval = setInterval(generateAlert, 15000);

    return () => clearInterval(interval);
  }, []);

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5" />;
      case 'danger': return <Zap className="w-5 h-5" />;
      case 'success': return <Eye className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getAlertColors = (type: string) => {
    switch (type) {
      case 'warning': return 'from-yellow-900 to-orange-900 border-yellow-500 text-yellow-400';
      case 'danger': return 'from-red-900 to-pink-900 border-red-500 text-red-400';
      case 'success': return 'from-green-900 to-emerald-900 border-green-500 text-green-400';
      default: return 'from-blue-900 to-indigo-900 border-blue-500 text-blue-400';
    }
  };

  if (!isVisible || alerts.length === 0) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed top-4 right-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all"
      >
        <Bell className="w-5 h-5" />
        {alerts.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {alerts.length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed top-4 right-4 z-50 w-80 space-y-2">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-bold flex items-center">
          <Bell className="w-4 h-4 mr-2" />
          Live Alerts
        </h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {alerts.map((alert, index) => (
        <div
          key={alert.id}
          className={`bg-gradient-to-r ${getAlertColors(alert.type)} border rounded-lg p-4 shadow-lg transform transition-all duration-500 animate-slideInRight`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className={getAlertColors(alert.type).split(' ')[3]}>
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white text-sm">{alert.title}</h4>
                <p className="text-gray-300 text-xs mt-1">{alert.message}</p>
                <span className="text-gray-400 text-xs">
                  {alert.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
            <button
              onClick={() => removeAlert(alert.id)}
              className="text-gray-400 hover:text-white transition-colors ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          {alert.priority === 'high' && (
            <div className="mt-2 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2" />
              <span className="text-red-400 text-xs font-semibold">HIGH PRIORITY</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RealTimeAlerts;