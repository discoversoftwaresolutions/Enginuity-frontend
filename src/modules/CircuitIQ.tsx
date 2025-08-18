import React, { useState } from 'react';

const CircuitIQ = () => {
  const [simulationMode, setSimulationMode] = useState('dc');
  const [isSimulating, setIsSimulating] = useState(false);
  const [circuitPower, setCircuitPower] = useState(false);

  const modes = [
    { id: 'dc', name: 'DC Analysis', icon: '⚡' },
    { id: 'ac', name: 'AC Analysis', icon: '〰️' },
    { id: 'transient', name: 'Transient', icon: '📈' },
    { id: 'frequency', name: 'Frequency', icon: '🌊' }
  ];

  const runSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-teal-900 to-blue-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🔬 CircuitIQ</h1>
          <p className="text-xl text-gray-300">Electronic Circuit Design & Semiconductor Analysis</p>
        </div>

        {/* Simulation Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSimulationMode(mode.id)}
                className={`px-4 py-3 rounded-lg mx-1 transition-all duration-300 flex items-center space-x-2 ${
                  simulationMode === mode.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{mode.icon}</span>
                <span>{mode.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Circuit Controls */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Circuit Control</h3>
              
              <div className="text-center mb-6">
                <button
                  onClick={() => setCircuitPower(!circuitPower)}
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-3xl mb-4 transition-all duration-300 ${
                    circuitPower 
                      ? 'bg-green-500/20 border-2 border-green-500 animate-pulse' 
                      : 'bg-gray-500/20 border-2 border-gray-500'
                  }`}
                >
                  {circuitPower ? '🔋' : '⭕'}
                </button>
                <p className="text-white font-semibold">{circuitPower ? 'Powered' : 'Off'}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Supply Voltage (V)</label>
                  <input
                    type="range"
                    min="1"
                    max="24"
                    defaultValue="5"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-green-400 text-sm">5.0 V</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Frequency (Hz)</label>
                  <input
                    type="range"
                    min="1"
                    max="1000000"
                    defaultValue="1000"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-green-400 text-sm">1.0 kHz</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Temperature (°C)</label>
                  <input
                    type="range"
                    min="-40"
                    max="125"
                    defaultValue="25"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-green-400 text-sm">25°C</span>
                </div>

                <button
                  onClick={runSimulation}
                  disabled={isSimulating}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-teal-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isSimulating ? 'Simulating...' : 'Run Analysis'}
                </button>
              </div>
            </div>

            {/* Component Library */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Components</h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">🔌</div>
                  <div className="text-xs text-gray-300">Resistor</div>
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">🔋</div>
                  <div className="text-xs text-gray-300">Capacitor</div>
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">🧲</div>
                  <div className="text-xs text-gray-300">Inductor</div>
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">🔺</div>
                  <div className="text-xs text-gray-300">Diode</div>
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">🔲</div>
                  <div className="text-xs text-gray-300">Transistor</div>
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 rounded-lg text-center transition-colors">
                  <div className="text-2xl mb-1">🎛️</div>
                  <div className="text-xs text-gray-300">Op-Amp</div>
                </button>
              </div>
            </div>
          </div>

          {/* Circuit Schematic */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Circuit Schematic</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Schematic</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">PCB Layout</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">3D View</button>
                </div>
              </div>
              
              <div className="relative h-full bg-gradient-to-br from-green-900/50 to-teal-900/50 rounded-xl flex items-center justify-center">
                {isSimulating ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
                    <p className="text-white">Running Circuit Analysis...</p>
                    <div className="flex justify-center space-x-2 mt-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🔬</div>
                    <p className="text-gray-300">Circuit Design Canvas</p>
                    <p className="text-sm text-gray-400 mt-2">Drag components to build your circuit</p>
                  </div>
                )}
              </div>
            </div>

            {/* Measurement Instruments */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Oscilloscope</h4>
                <div className="h-24 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Waveform Display</span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-green-400 text-sm">CH1: 2.5V</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Multimeter</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">4.97V</div>
                  <div className="text-sm text-gray-400">DC Voltage</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Function Generator</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Waveform</span>
                    <span className="text-blue-400">Sine</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Amplitude</span>
                    <span className="text-green-400">5V</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Frequency</span>
                    <span className="text-purple-400">1kHz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Analysis Results</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">DC Operating Point</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Node 1</span>
                      <span className="text-green-400">5.0V</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Node 2</span>
                      <span className="text-blue-400">2.5V</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Current</span>
                      <span className="text-yellow-400">10mA</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Power Analysis</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Total Power</span>
                      <span className="text-red-400">25mW</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Efficiency</span>
                      <span className="text-green-400">85%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Frequency Response</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Bandwidth</span>
                      <span className="text-purple-400">10kHz</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Gain</span>
                      <span className="text-blue-400">20dB</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Phase</span>
                      <span className="text-cyan-400">-45°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Design Tools</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Auto Route
                </button>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  DRC Check
                </button>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Generate Netlist
                </button>
                <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                  Export Gerber
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircuitIQ;
