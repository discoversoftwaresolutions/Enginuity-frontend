import React, { useState } from 'react';

const FlowCore = () => {
  const [activeSimulation, setActiveSimulation] = useState('thermal');
  const [isRunning, setIsRunning] = useState(false);

  const startSimulation = () => {
    setIsRunning(true);
    setTimeout(() => setIsRunning(false), 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🔄 FlowCore</h1>
          <p className="text-xl text-gray-300">Advanced Fluid Dynamics & Thermal Analysis</p>
        </div>

        {/* Simulation Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            {[
              { id: 'thermal', name: 'Thermal Analysis', icon: '🌡️' },
              { id: 'fluid', name: 'Fluid Flow', icon: '💧' },
              { id: 'heat', name: 'Heat Transfer', icon: '🔥' },
              { id: 'mixing', name: 'Mixing Analysis', icon: '🌪️' }
            ].map((sim) => (
              <button
                key={sim.id}
                onClick={() => setActiveSimulation(sim.id)}
                className={`px-4 py-3 rounded-lg mx-1 transition-all duration-300 flex items-center space-x-2 ${
                  activeSimulation === sim.id
                    ? 'bg-teal-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{sim.icon}</span>
                <span>{sim.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Control Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Flow Parameters</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Reynolds Number</label>
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    defaultValue="100000"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-teal-400 text-sm">1.0 × 10⁵</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Temperature (K)</label>
                  <input
                    type="range"
                    min="273"
                    max="1273"
                    defaultValue="373"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-teal-400 text-sm">373 K</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Pressure (Pa)</label>
                  <input
                    type="range"
                    min="101325"
                    max="1013250"
                    defaultValue="101325"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-teal-400 text-sm">1.01 × 10⁵ Pa</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Viscosity (Pa·s)</label>
                  <input
                    type="range"
                    min="0.001"
                    max="0.1"
                    step="0.001"
                    defaultValue="0.001"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-teal-400 text-sm">0.001 Pa·s</span>
                </div>

                <button
                  onClick={startSimulation}
                  disabled={isRunning}
                  className="w-full py-3 bg-gradient-to-r from-teal-600 to-blue-600 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isRunning ? 'Computing...' : 'Start Simulation'}
                </button>
              </div>
            </div>

            {/* Real-time Metrics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Live Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Flow Rate</span>
                  <span className="text-teal-400 font-mono">2.5 m³/s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Heat Flux</span>
                  <span className="text-orange-400 font-mono">1.2 kW/m²</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Pressure Drop</span>
                  <span className="text-red-400 font-mono">0.8 kPa</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Efficiency</span>
                  <span className="text-green-400 font-mono">87.3%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Visualization */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Flow Visualization</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-teal-600 text-white rounded text-sm">Velocity</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Temperature</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Pressure</button>
                </div>
              </div>
              
              <div className="relative h-full bg-gradient-to-br from-teal-900/50 to-blue-900/50 rounded-xl flex items-center justify-center">
                {isRunning ? (
                  <div className="text-center">
                    <div className="animate-pulse text-6xl mb-4">🌊</div>
                    <p className="text-white">Computing Flow Dynamics...</p>
                    <div className="w-64 bg-gray-700 rounded-full h-2 mt-4">
                      <div className="bg-teal-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔄</div>
                    <p className="text-gray-300">Computational Fluid Dynamics</p>
                    <p className="text-sm text-gray-400 mt-2">3D flow field visualization</p>
                  </div>
                )}
              </div>
            </div>

            {/* Analysis Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Velocity Profile</h4>
                <div className="h-32 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Velocity Distribution</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Temperature Field</h4>
                <div className="h-32 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Thermal Distribution</span>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Analysis Results</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Convergence</h4>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '95%'}}></div>
                  </div>
                  <span className="text-green-400 text-sm">95% Converged</span>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Mesh Quality</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Elements</span>
                    <span className="text-blue-400">2.1M</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Aspect Ratio</span>
                    <span className="text-green-400">Good</span>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">CPU Time</span>
                      <span className="text-yellow-400">12.3 min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Memory Usage</span>
                      <span className="text-purple-400">4.2 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Export Options</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Export Results
                </button>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Generate Report
                </button>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Save Configuration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowCore;
