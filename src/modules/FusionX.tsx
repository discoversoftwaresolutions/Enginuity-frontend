import React, { useState } from 'react';

const FusionX = () => {
  const [activeModule, setActiveModule] = useState('plasma');
  const [reactorStatus, setReactorStatus] = useState('standby');

  const modules = [
    { id: 'plasma', name: 'Plasma Physics', icon: '⚡' },
    { id: 'materials', name: 'Materials', icon: '🔬' },
    { id: 'magnetic', name: 'Magnetic Confinement', icon: '🧲' },
    { id: 'energy', name: 'Energy Systems', icon: '⚙️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">⚙️ FusionX</h1>
          <p className="text-xl text-gray-300">Advanced Fusion Technology & Materials Engineering</p>
        </div>

        {/* Module Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`px-4 py-3 rounded-lg mx-1 transition-all duration-300 flex items-center space-x-2 ${
                  activeModule === module.id
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{module.icon}</span>
                <span>{module.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Reactor Control */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Reactor Control</h3>
              
              <div className="text-center mb-6">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${
                  reactorStatus === 'active' ? 'bg-green-500/20 border-2 border-green-500' :
                  reactorStatus === 'charging' ? 'bg-yellow-500/20 border-2 border-yellow-500' :
                  'bg-gray-500/20 border-2 border-gray-500'
                }`}>
                  {reactorStatus === 'active' ? '🔥' : reactorStatus === 'charging' ? '⚡' : '⭕'}
                </div>
                <p className="text-white font-semibold capitalize">{reactorStatus}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Plasma Temperature (keV)</label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    defaultValue="10"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-purple-400 text-sm">10 keV</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Magnetic Field (T)</label>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    defaultValue="5"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-purple-400 text-sm">5.0 T</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Density (10¹⁹ m⁻³)</label>
                  <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    defaultValue="1"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-purple-400 text-sm">1.0 × 10¹⁹ m⁻³</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button
                    onClick={() => setReactorStatus('charging')}
                    className="py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                  >
                    Charge
                  </button>
                  <button
                    onClick={() => setReactorStatus('active')}
                    className="py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Ignite
                  </button>
                </div>
                <button
                  onClick={() => setReactorStatus('standby')}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                >
                  Emergency Stop
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Confinement Time</span>
                  <span className="text-green-400 font-mono">2.3 s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Beta Value</span>
                  <span className="text-blue-400 font-mono">0.05</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Q Factor</span>
                  <span className="text-purple-400 font-mono">1.2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Power Output</span>
                  <span className="text-yellow-400 font-mono">50 MW</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Display */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Tokamak Visualization</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">Plasma</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Magnetic Field</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Temperature</button>
                </div>
              </div>
              
              <div className="relative h-full bg-gradient-to-br from-purple-900/50 to-pink-900/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-8xl mb-4 ${reactorStatus === 'active' ? 'animate-pulse' : ''}`}>
                    {reactorStatus === 'active' ? '🔥' : '⭕'}
                  </div>
                  <p className="text-gray-300">Tokamak Cross-Section</p>
                  <p className="text-sm text-gray-400 mt-2">3D plasma confinement visualization</p>
                  {reactorStatus === 'active' && (
                    <div className="mt-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
                      <p className="text-purple-400 text-sm mt-2">Fusion Reaction Active</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Energy Balance</h4>
                <div className="h-32 bg-gradient-to-r from-green-500/20 to-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Power Flow</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Plasma Stability</h4>
                <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">MHD Analysis</span>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Material Stress</h4>
                <div className="h-32 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Structural Analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Materials Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Materials Analysis</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">First Wall</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Material</span>
                      <span className="text-blue-400">Tungsten</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Temperature</span>
                      <span className="text-red-400">1200°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Stress</span>
                      <span className="text-yellow-400">85 MPa</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Breeding Blanket</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Material</span>
                      <span className="text-blue-400">Li₄SiO₄</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Tritium Rate</span>
                      <span className="text-green-400">1.05</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Superconductor</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Type</span>
                      <span className="text-blue-400">Nb₃Sn</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Temperature</span>
                      <span className="text-cyan-400">4.2 K</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Current</span>
                      <span className="text-purple-400">40 kA</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Diagnostics</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Thomson Scattering
                </button>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Neutron Flux
                </button>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  X-ray Spectroscopy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FusionX;
