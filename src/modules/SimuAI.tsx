import React, { useState } from 'react';

const SimulAI = () => {
  const [activeModel, setActiveModel] = useState('neural');
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [isTraining, setIsTraining] = useState(false);

  const startTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const models = [
    { id: 'neural', name: 'Neural Networks', icon: '🧠' },
    { id: 'genetic', name: 'Genetic Algorithm', icon: '🧬' },
    { id: 'reinforcement', name: 'Reinforcement Learning', icon: '🎯' },
    { id: 'ensemble', name: 'Ensemble Methods', icon: '🎭' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">🧩 SimulAI</h1>
          <p className="text-xl text-gray-300">AI-Powered Engineering Simulations & Predictive Modeling</p>
        </div>

        {/* Model Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-2 border border-white/20">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setActiveModel(model.id)}
                className={`px-4 py-3 rounded-lg mx-1 transition-all duration-300 flex items-center space-x-2 ${
                  activeModel === model.id
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{model.icon}</span>
                <span>{model.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Model Configuration */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Model Configuration</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">Learning Rate</label>
                  <input
                    type="range"
                    min="0.001"
                    max="0.1"
                    step="0.001"
                    defaultValue="0.01"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-indigo-400 text-sm">0.01</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Batch Size</label>
                  <select className="w-full bg-gray-700 text-white rounded-lg p-2">
                    <option value="32">32</option>
                    <option value="64">64</option>
                    <option value="128">128</option>
                    <option value="256">256</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Epochs</label>
                  <input
                    type="range"
                    min="10"
                    max="1000"
                    defaultValue="100"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-indigo-400 text-sm">100</span>
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">Regularization</label>
                  <input
                    type="range"
                    min="0"
                    max="0.1"
                    step="0.001"
                    defaultValue="0.01"
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-indigo-400 text-sm">0.01</span>
                </div>

                <button
                  onClick={startTraining}
                  disabled={isTraining}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
                >
                  {isTraining ? 'Training...' : 'Start Training'}
                </button>

                {isTraining && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-gray-300 mb-2">
                      <span>Progress</span>
                      <span>{trainingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{width: `${trainingProgress}%`}}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Model Metrics */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Model Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="text-green-400 font-mono">94.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Loss</span>
                  <span className="text-red-400 font-mono">0.058</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">F1 Score</span>
                  <span className="text-blue-400 font-mono">0.91</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">AUC</span>
                  <span className="text-purple-400 font-mono">0.96</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Visualization */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-white">Neural Network Architecture</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">Architecture</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Training</button>
                  <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm">Predictions</button>
                </div>
              </div>
              
              <div className="relative h-full bg-gradient-to-br from-indigo-900/50 to-purple-900/50 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🧠</div>
                  <p className="text-gray-300">Neural Network Visualization</p>
                  <p className="text-sm text-gray-400 mt-2">Interactive model architecture</p>
                  
                  {isTraining && (
                    <div className="mt-6">
                      <div className="flex justify-center space-x-4 mb-4">
                        <div className="w-4 h-4 bg-indigo-500 rounded-full animate-pulse"></div>
                        <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                        <div className="w-4 h-4 bg-pink-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      </div>
                      <p className="text-indigo-400 text-sm">Training in progress...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Performance Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Training History</h4>
                <div className="h-32 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Loss & Accuracy Curves</span>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h4 className="text-lg font-bold text-white mb-4">Confusion Matrix</h4>
                <div className="h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-gray-300">Classification Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Data & Analysis */}
          <div className="xl:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6">Dataset Info</h3>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Training Data</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Samples</span>
                      <span className="text-blue-400">50,000</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Features</span>
                      <span className="text-green-400">128</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Classes</span>
                      <span className="text-purple-400">10</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Validation</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Split Ratio</span>
                      <span className="text-blue-400">80/20</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Cross-Validation</span>
                      <span className="text-green-400">5-Fold</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Preprocessing</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Normalization</span>
                      <span className="text-green-400">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Feature Selection</span>
                      <span className="text-green-400">✓</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Augmentation</span>
                      <span className="text-green-400">✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
              <h3 className="text-xl font-bold text-white mb-4">Model Operations</h3>
              <div className="space-y-3">
                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Save Model
                </button>
                <button className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Export Weights
                </button>
                <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Deploy Model
                </button>
                <button className="w-full py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors">
                  Hyperparameter Tuning
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulAI;
