import React, { useState } from 'react';

const ProtoPrint = () => {
  const [printStatus, setPrintStatus] = useState('ready');
  const [printProgress, setPrintProgress] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState('pla');

  const startPrint = () => {
    setPrintStatus('printing');
    setPrintProgress(0);
    const interval = setInterval(() => {
      setPrintProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setPrintStatus('completed');
          return 100;
        }
        return prev + 1;
      });
    }, 200);
  };

  const materials = [
    { id: 'pla', name: 'PLA', temp: '200°C', color: 'text-green-400' },
    { id: 'abs', name: 'ABS', temp: '250°C', color: 'text-blue-400' },
    { id: 'petg', name: 'PETG', temp: '230°C', color: 'text-purple-400' },
    { id: 'tpu', name: 'TPU', temp: '220°C', color: 'text-yellow-400' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-pink-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🖨️ ProtoPrint</h1>
          <p className="text-xl text-gray-300">3D Printing Optimization & Rapid Prototyping Solutions</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Printer Control */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Printer Control</h3>
              
              <div className="text-center mb-6">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${
                  printStatus === 'printing' ? 'bg-orange-500/20 border-2 border-orange-500 animate-pulse' :
                  printStatus === 'completed' ? 'bg-green-500/20 border-2 border-green-500' :
                  'bg-gray-500/20 border-2 border-gray-500'
                }`}>
                  {printStatus === 'printing' ? '🔥' : printStatus === 'completed' ? '✅' : '🖨️'}
                </div>
                <p className="text-white font-semibold capitalize">{printStatus}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Material</label>
                  <select 
                    value={selectedMaterial}
                    onChange={(e) => setSelectedMaterial(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg p-2"
                  >
                    {materials.map(material => (
                      <option key={material.id} value={material.id}>
                        {material.name} ({material.temp})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Layer Height (mm)</label>
                  <input
                    type="range"
                    min="0.1"
                    max="0.4"
                    step="0.05"
                    defaultValue="0.2"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-orange-400 text-sm">0.2 mm</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Infill (%)</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    defaultValue="20"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-orange-400 text-sm">20%</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Print Speed (mm/s)</label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    defaultValue="50"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-orange-400 text-sm">50 mm/s</span>
                </div>

                <button
                  onClick={startPrint}
                  disabled={printStatus === 'printing'}
                  className="w-full py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-300 disabled:opacity-50"
                >
                  {printStatus === 'printing' ? 'Printing...' : 'Start Print'}
                </button>

                {printStatus === 'printing' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Progress</span>
                      <span>{printProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-orange-600 to-red-600 h-2 rounded-full transition-all duration-300"
                        style={{width: `${printProgress}%`}}
                      ></div>
                    </div>
                    <div className="text-center mt-2">
                      <span className="text-orange-400 text-sm">
                        ETA: {Math.max(0, Math.round((100 - printProgress) * 0.5))} min
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Printer Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Printer Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Nozzle Temp</span>
                  <span className="text-red-400 font-mono">200°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Bed Temp</span>
                  <span className="text-orange-400 font-mono">60°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Fan Speed</span>
                  <span className="text-blue-400 font-mono">75%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Filament</span>
                  <span className="text-green-400 font-mono">85%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Visualization */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Print Preview</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-orange-600 text-white rounded text-sm">Layer View</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Support</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Infill</button>
                </div>
              </div>
              
              <div className="relative h-full bg-gradient-to-br from-orange-900/50 to-red-900/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-6xl mb-4 ${printStatus === 'printing' ? 'animate-bounce' : ''}`}>
                    🖨️
                  </div>
                  <p className="text-gray-300">3D Model Preview</p>
                  <p className="text-sm text-gray-400 mt-2">Layer-by-layer visualization</p>
                  
                  {printStatus === 'printing' && (
                    <div className="mt-6">
                      <div className="text-orange-400 text-lg font-semibold">
                        Layer {Math.floor(printProgress * 2.5)} / 250
                      </div>
                      <div className="flex justify-center space-x-2 mt-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Print Analytics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Print Time</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">2h 45m</div>
                  <div className="text-sm text-gray-400">Estimated Duration</div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Material Usage</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">45.2g</div>
                  <div className="text-sm text-gray-400">Filament Required</div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Cost Estimate</h4>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">$3.20</div>
                  <div className="text-sm text-gray-400">Total Cost</div>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Print Settings</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Quality</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="radio" name="quality" className="mr-2" defaultChecked />
                      <span className="text-gray-300">Standard (0.2mm)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="quality" className="mr-2" />
                      <span className="text-gray-300">Fine (0.1mm)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="radio" name="quality" className="mr-2" />
                      <span className="text-gray-300">Draft (0.3mm)</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Support</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-gray-300">Generate Supports</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" defaultChecked />
                      <span className="text-gray-300">Build Plate Adhesion</span>
                    </label>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Advanced</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Retraction</span>
                      <span className="text-blue-400">6.5mm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Travel Speed</span>
                      <span className="text-green-400">150 mm/s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Z-hop</span>
                      <span className="text-purple-400">0.2mm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">File Operations</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Load STL
                </button>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Slice Model
                </button>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Export G-code
                </button>
                <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtoPrint;
