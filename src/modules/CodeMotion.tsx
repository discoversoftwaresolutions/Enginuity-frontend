import React, { useState } from 'react';

const CodeMotion = () => {
  const [robotStatus, setRobotStatus] = useState('idle');
  const [isExecuting, setIsExecuting] = useState(false);
  const [selectedRobot, setSelectedRobot] = useState('arm');

  const robots = [
    { id: 'arm', name: 'Robotic Arm', icon: '🦾' },
    { id: 'mobile', name: 'Mobile Robot', icon: '🤖' },
    { id: 'drone', name: 'Drone', icon: '🚁' },
    { id: 'humanoid', name: 'Humanoid', icon: '🤖' }
  ];

  const executeProgram = () => {
    setIsExecuting(true);
    setRobotStatus('executing');
    setTimeout(() => {
      setIsExecuting(false);
      setRobotStatus('completed');
      setTimeout(() => setRobotStatus('idle'), 2000);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🤖 CodeMotion</h1>
          <p className="text-xl text-gray-300">Robotics Programming & Motion Control Systems</p>
        </div>

        {/* Robot Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            {robots.map((robot) => (
              <button
                key={robot.id}
                onClick={() => setSelectedRobot(robot.id)}
                className={`px-4 py-3 rounded-lg mx-1 transition-all duration-300 flex items-center space-x-2 ${
                  selectedRobot === robot.id
                    ? 'bg-slate-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{robot.icon}</span>
                <span>{robot.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Robot Control */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Robot Control</h3>
              
              <div className="text-center mb-6">
                <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 ${
                  robotStatus === 'executing' ? 'bg-blue-500/20 border-2 border-blue-500 animate-pulse' :
                  robotStatus === 'completed' ? 'bg-green-500/20 border-2 border-green-500' :
                  'bg-gray-500/20 border-2 border-gray-500'
                }`}>
                  {robotStatus === 'executing' ? '⚡' : robotStatus === 'completed' ? '✅' : '🤖'}
                </div>
                <p className="text-white font-semibold capitalize">{robotStatus}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Speed (%)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue="50"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-slate-400 text-sm">50%</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Precision</label>
                  <select className="w-full bg-gray-700 text-white rounded-lg p-2">
                    <option value="low">Low (±1mm)</option>
                    <option value="medium">Medium (±0.1mm)</option>
                    <option value="high">High (±0.01mm)</option>
                    <option value="ultra">Ultra (±0.001mm)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Force Limit (N)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    defaultValue="20"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-slate-400 text-sm">20 N</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-6">
                  <button className="py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                    Home
                  </button>
                  <button className="py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                    Calibrate
                  </button>
                </div>

                <button
                  onClick={executeProgram}
                  disabled={isExecuting}
                  className="w-full py-3 bg-gradient-to-r from-slate-600 to-gray-600 text-white rounded-lg font-semibold hover:from-slate-700 hover:to-gray-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isExecuting ? 'Executing...' : 'Execute Program'}
                </button>

                <button className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                  Emergency Stop
                </button>
              </div>
            </div>

            {/* Joint Status */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Joint Status</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Joint 1</span>
                  <span className="text-blue-400 font-mono">45.2°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Joint 2</span>
                  <span className="text-green-400 font-mono">-30.1°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Joint 3</span>
                  <span className="text-purple-400 font-mono">90.0°</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">End Effector</span>
                  <span className="text-yellow-400 font-mono">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code Editor & Visualization */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Motion Programming</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-slate-600 text-white rounded text-sm">Code</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Simulation</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Path</button>
                </div>
              </div>
              
              <div className="h-full bg-gray-900 rounded-xl p-4 font-mono text-sm overflow-auto">
                <div className="text-gray-400 mb-2">// Robot Motion Program</div>
                <div className="text-blue-400">def <span className="text-yellow-400">pick_and_place</span>():</div>
                <div className="ml-4 text-gray-300">
                  <div className="text-green-400"># Move to pick position</div>
                  <div>move_to(<span className="text-orange-400">x=100, y=200, z=50</span>)</div>
                  <div>gripper.open()</div>
                  <div>move_to(<span className="text-orange-400">x=100, y=200, z=10</span>)</div>
                  <div>gripper.close()</div>
                  <div className="text-green-400"># Move to place position</div>
                  <div>move_to(<span className="text-orange-400">x=300, y=150, z=50</span>)</div>
                  <div>move_to(<span className="text-orange-400">x=300, y=150, z=10</span>)</div>
                  <div>gripper.open()</div>
                  <div>move_to(<span className="text-orange-400">x=300, y=150, z=50</span>)</div>
                </div>
                <div className="mt-4 text-blue-400">execute(<span className="text-yellow-400">pick_and_place</span>)</div>
                
                {isExecuting && (
                  <div className="mt-4 p-2 bg-blue-900/50 rounded border-l-4 border-blue-400">
                    <div className="text-blue-300">▶ Executing motion sequence...</div>
                    <div className="text-gray-400 text-xs mt-1">Step 3/8: Moving to position (300, 150, 50)</div>
                  </div>
                )}
              </div>
            </div>

            {/* Motion Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Path Planning</h4>
                <div className="h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Trajectory Visualization</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Performance Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Cycle Time</span>
                    <span className="text-green-400">12.5s</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Accuracy</span>
                    <span className="text-blue-400">±0.05mm</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Efficiency</span>
                    <span className="text-purple-400">94.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sensors & Diagnostics */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Sensor Data</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Position Sensors</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">X Position</span>
                      <span className="text-blue-400">150.2mm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Y Position</span>
                      <span className="text-green-400">200.8mm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Z Position</span>
                      <span className="text-purple-400">75.5mm</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Force Sensors</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Force X</span>
                      <span className="text-red-400">2.1 N</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Force Y</span>
                      <span className="text-yellow-400">-0.8 N</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Force Z</span>
                      <span className="text-cyan-400">15.2 N</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">System Health</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Motor Temp</span>
                      <span className="text-green-400">42°C</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Vibration</span>
                      <span className="text-green-400">Normal</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Power Draw</span>
                      <span className="text-blue-400">180W</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Program Library</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-left px-3">
                  📁 Pick & Place
                </button>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-left px-3">
                  📁 Assembly Line
                </button>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-left px-3">
                  📁 Quality Inspection
                </button>
                <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors text-left px-3">
                  📁 Welding Path
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeMotion;
