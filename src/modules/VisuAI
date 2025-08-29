import React, { useState } from 'react';

const VisuAI = () => {
  const [activeMode, setActiveMode] = useState('3d');
  const [renderQuality, setRenderQuality] = useState('high');
  const [isRendering, setIsRendering] = useState(false);

  const modes = [
    { id: '3d', name: '3D Modeling', icon: '🎯' },
    { id: 'ar', name: 'AR Visualization', icon: '🥽' },
    { id: 'cv', name: 'Computer Vision', icon: '👁️' },
    { id: 'analysis', name: 'Image Analysis', icon: '🔍' }
  ];

  const startRender = () => {
    setIsRendering(true);
    setTimeout(() => setIsRendering(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🎨 VisuAI</h1>
          <p className="text-xl text-gray-300">Advanced Visualization & Computer Vision for Engineering</p>
        </div>

        {/* Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            {modes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={`px-4 py-3 rounded-lg mx-1 transition-all duration-300 flex items-center space-x-2 ${
                  activeMode === mode.id
                    ? 'bg-cyan-600 text-white shadow-lg'
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
          {/* Rendering Controls */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Render Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Quality</label>
                  <select 
                    value={renderQuality}
                    onChange={(e) => setRenderQuality(e.target.value)}
                    className="w-full bg-gray-700 text-white rounded-lg p-2"
                  >
                    <option value="low">Low (Fast)</option>
                    <option value="medium">Medium</option>
                    <option value="high">High (Detailed)</option>
                    <option value="ultra">Ultra (Photorealistic)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Resolution</label>
                  <select className="w-full bg-gray-700 text-white rounded-lg p-2">
                    <option value="1080p">1920x1080</option>
                    <option value="1440p">2560x1440</option>
                    <option value="4k">3840x2160</option>
                    <option value="8k">7680x4320</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Lighting</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    defaultValue="75"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-cyan-400 text-sm">75% Intensity</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Anti-Aliasing</label>
                  <select className="w-full bg-gray-700 text-white rounded-lg p-2">
                    <option value="none">None</option>
                    <option value="fxaa">FXAA</option>
                    <option value="msaa">MSAA 4x</option>
                    <option value="msaa8">MSAA 8x</option>
                  </select>
                </div>

                <button
                  onClick={startRender}
                  disabled={isRendering}
                  className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isRendering ? 'Rendering...' : 'Start Render'}
                </button>

                {isRendering && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Rendering Progress</span>
                      <span>Processing...</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 h-2 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scene Properties */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Scene Properties</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Objects</span>
                  <span className="text-cyan-400 font-mono">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Polygons</span>
                  <span className="text-blue-400 font-mono">2.1M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Textures</span>
                  <span className="text-purple-400 font-mono">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Materials</span>
                  <span className="text-green-400 font-mono">89</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Viewport */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">3D Viewport</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-cyan-600 text-white rounded text-sm">Wireframe</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Solid</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Rendered</button>
                </div>
              </div>
              
              <div className="relative h-full bg-gradient-to-br from-cyan-900/50 to-blue-900/50 rounded-xl flex items-center justify-center">
                {isRendering ? (
                  <div className="text-center">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                      <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border border-cyan-400 mx-auto opacity-20"></div>
                    </div>
                    <p className="text-white">Rendering 3D Scene...</p>
                    <p className="text-cyan-400 text-sm mt-2">Ray tracing in progress</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎯</div>
                    <p className="text-gray-300">3D Engineering Model</p>
                    <p className="text-sm text-gray-400 mt-2">Interactive 3D visualization workspace</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tool Panels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Camera Controls</h4>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-cyan-600/20 hover:bg-cyan-600/40 text-cyan-300 rounded-lg transition-colors">
                    Orbit View
                  </button>
                  <button className="w-full py-2 bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 rounded-lg transition-colors">
                    Pan View
                  </button>
                  <button className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 rounded-lg transition-colors">
                    Zoom Fit
                  </button>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Measurement Tools</h4>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-green-600/20 hover:bg-green-600/40 text-green-300 rounded-lg transition-colors">
                    Distance
                  </button>
                  <button className="w-full py-2 bg-yellow-600/20 hover:bg-yellow-600/40 text-yellow-300 rounded-lg transition-colors">
                    Angle
                  </button>
                  <button className="w-full py-2 bg-red-600/20 hover:bg-red-600/40 text-red-300 rounded-lg transition-colors">
                    Volume
                  </button>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Analysis Tools</h4>
                <div className="space-y-2">
                  <button className="w-full py-2 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 rounded-lg transition-colors">
                    Cross Section
                  </button>
                  <button className="w-full py-2 bg-pink-600/20 hover:bg-pink-600/40 text-pink-300 rounded-lg transition-colors">
                    Surface Analysis
                  </button>
                  <button className="w-full py-2 bg-orange-600/20 hover:bg-orange-600/40 text-orange-300 rounded-lg transition-colors">
                    Interference Check
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Object Properties</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Transform</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <input type="number" placeholder="X" className="bg-gray-700 text-white rounded p-1 text-sm" />
                      <input type="number" placeholder="Y" className="bg-gray-700 text-white rounded p-1 text-sm" />
                      <input type="number" placeholder="Z" className="bg-gray-700 text-white rounded p-1 text-sm" />
                    </div>
                    <label className="text-gray-400 text-xs">Position</label>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Material</h4>
                  <div className="space-y-2">
                    <select className="w-full bg-gray-700 text-white rounded p-2 text-sm">
                      <option>Steel</option>
                      <option>Aluminum</option>
                      <option>Titanium</option>
                      <option>Carbon Fiber</option>
                    </select>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Roughness</span>
                      <span className="text-blue-400">0.3</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Metallic</span>
                      <span className="text-green-400">0.8</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Lighting</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Ambient</span>
                      <span className="text-cyan-400">0.2</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Diffuse</span>
                      <span className="text-blue-400">0.8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Specular</span>
                      <span className="text-purple-400">0.5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Export Options</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Export STL
                </button>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Export OBJ
                </button>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Export STEP
                </button>
                <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                  Render Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisuAI;
