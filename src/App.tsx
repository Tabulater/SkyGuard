import React, { useState } from 'react';
import { Telescope, Activity, Satellite, Image, Calendar, Star, Map, Globe } from 'lucide-react';
import ParticleField from './components/ParticleField';
import MeteorTrail from './components/MeteorTrail';
import EnhancedMeteorShowerCard from './components/EnhancedMeteorShowerCard';
import SpaceWeatherPanel from './components/SpaceWeatherPanel';
import NearEarthObjectCard from './components/NearEarthObjectCard';
import AstronomyPictureCard from './components/AstronomyPictureCard';
import InteractiveStarMap from './components/InteractiveStarMap';
import SolarSystemVisualization from './components/SolarSystemVisualization';
import RealTimeAlerts from './components/RealTimeAlerts';
import { useSpaceData } from './hooks/useSpaceData';
import { meteorShowers2025 } from './data/meteorShowers';

const App: React.FC = () => {
  const { nearEarthObjects, spaceWeather, astronomyPicture, loading, error } = useSpaceData();
  const [activeTab, setActiveTab] = useState('meteors');

  const getNextMeteorShower = () => {
    const today = new Date();
    return meteorShowers2025.find(shower => new Date(shower.peak_date) > today) || meteorShowers2025[0];
  };

  const getRecentMeteorShowers = () => {
    return meteorShowers2025.slice(0, 3);
  };

  const tabs = [
    { id: 'meteors', label: 'Meteor Showers', icon: Star },
    { id: 'neo', label: 'Near-Earth Objects', icon: Satellite },
    { id: 'starmap', label: 'Star Map', icon: Map },
    { id: 'solar', label: 'Solar System', icon: Globe },
    { id: 'weather', label: 'Space Weather', icon: Activity },
    { id: 'apod', label: 'Astronomy Picture', icon: Image }
  ];

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-2">Connection Error</h2>
          <p className="text-gray-400">Unable to fetch space data. Please check your connection.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ParticleField />
      <MeteorTrail />
      <RealTimeAlerts />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black bg-opacity-60 backdrop-blur-xl border-b border-gray-800 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Telescope className="w-10 h-10 text-blue-400 animate-pulse" />
                  <div className="absolute inset-0 w-10 h-10 bg-blue-400 rounded-full opacity-20 animate-ping" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Space Prediction Center
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">Advanced Astronomical Monitoring System</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-lg p-3 border border-green-500/30">
                  <div className="flex items-center mb-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2" />
                    <p className="text-green-400 text-sm font-medium">SYSTEM ONLINE</p>
                  </div>
                  <p className="text-white text-lg font-bold">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <nav className="bg-black bg-opacity-40 backdrop-blur-xl border-b border-gray-800 sticky top-0 z-20 shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex space-x-8 overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-4 border-b-2 transition-all duration-300 hover:bg-white/5 rounded-t-lg ${
                      activeTab === tab.id
                        ? 'border-blue-400 text-blue-400 bg-blue-400/10'
                        : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {loading ? (
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mb-4"></div>
                <p className="text-gray-400">Loading space data...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Meteor Showers Tab */}
              {activeTab === 'meteors' && (
                <div className="space-y-8">
                  {/* Next Shower Highlight */}
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Calendar className="w-6 h-6 mr-3 text-green-400" />
                      <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        Next Major Meteor Shower
                      </span>
                    </h2>
                    <div className="max-w-2xl">
                      <EnhancedMeteorShowerCard shower={getNextMeteorShower()} isUpcoming={true} />
                    </div>
                  </section>

                  {/* All Meteor Showers */}
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3 text-purple-400" />
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        2025 Meteor Shower Calendar
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {meteorShowers2025.map((shower, index) => (
                        <EnhancedMeteorShowerCard key={index} shower={shower} />
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {/* Near-Earth Objects Tab */}
              {activeTab === 'neo' && (
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Satellite className="w-6 h-6 mr-3 text-orange-400" />
                      <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                        Upcoming Close Approaches
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {nearEarthObjects.map((neo, index) => (
                        <NearEarthObjectCard key={neo.id} neo={neo} />
                      ))}
                    </div>
                    {nearEarthObjects.length === 0 && (
                      <p className="text-gray-400 text-center py-12">
                        No near-Earth objects data available. Please check back later.
                      </p>
                    )}
                  </section>
                </div>
              )}

              {/* Star Map Tab */}
              {activeTab === 'starmap' && (
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Map className="w-6 h-6 mr-3 text-indigo-400" />
                      <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        Interactive Star Map
                      </span>
                    </h2>
                    <InteractiveStarMap />
                  </section>
                </div>
              )}

              {/* Solar System Tab */}
              {activeTab === 'solar' && (
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Globe className="w-6 h-6 mr-3 text-yellow-400" />
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                        Solar System Visualization
                      </span>
                    </h2>
                    <SolarSystemVisualization />
                  </section>
                </div>
              )}

              {/* Space Weather Tab */}
              {activeTab === 'weather' && (
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Activity className="w-6 h-6 mr-3 text-cyan-400" />
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Current Space Weather
                      </span>
                    </h2>
                    {spaceWeather ? (
                      <div className="max-w-4xl">
                        <SpaceWeatherPanel data={spaceWeather} />
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-12">
                        Space weather data is currently unavailable.
                      </p>
                    )}
                  </section>
                </div>
              )}

              {/* Astronomy Picture Tab */}
              {activeTab === 'apod' && (
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                      <Image className="w-6 h-6 mr-3 text-pink-400" />
                      <span className="bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                        Astronomy Picture of the Day
                      </span>
                    </h2>
                    {astronomyPicture ? (
                      <div className="max-w-4xl">
                        <AstronomyPictureCard picture={astronomyPicture} />
                      </div>
                    ) : (
                      <p className="text-gray-400 text-center py-12">
                        Astronomy picture data is currently unavailable.
                      </p>
                    )}
                  </section>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-black bg-opacity-60 backdrop-blur-xl border-t border-gray-800 mt-16 shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-white font-bold mb-2">Data Sources</h3>
                <p className="text-gray-400 text-sm">
                  NASA API • Australian Bureau of Meteorology • JPL Small-Body Database
                </p>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">System Status</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-medium">All systems operational</span>
                </div>
              </div>
              <div>
                <h3 className="text-white font-bold mb-2">Last Updated</h3>
                <span className="text-gray-400 text-sm">
                  {new Date().toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;