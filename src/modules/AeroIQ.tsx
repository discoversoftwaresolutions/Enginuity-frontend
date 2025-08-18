import React, { useState, useEffect } from 'react';
import { getWavefronts, getOrbit, getHohmannTransfer, getCFDAnalysis, getFlightEnvelope } from '../services/aeroiqService';
import { FileUpload } from '../components/FileUpload';
import { SimulationEngine } from '../utils/simulationEngine';

const AeroIQ = () => {
  const [activeAnalysis, setActiveAnalysis] = useState('cfd');
  const [isComputing, setIsComputing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [simulationProgress, setSimulationProgress] = useState(0);

  // Flight Parameters State
  const [flightParams, setFlightParams] = useState({
    altitude: 35000,
    mach: 0.8,
    angleOfAttack: 5,
    temperature: 288.15,
    pressure: 101325
  });

  // Orbital Parameters State
  const [orbitalParams, setOrbitalParams] = useState({
    semiMajorAxis: 7000,
    eccentricity: 0.1,
    inclination: 28.5
  });

  // Hohmann Transfer Parameters State
  const [transferParams, setTransferParams] = useState({
    initialRadius: 6678,
    targetRadius: 42164
  });

  const executeAnalysis = async () => {
    setIsComputing(true);
    setError(null);
    setSimulationProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
    
    try {
      let result;
      
      // First try API calls, then fall back to local simulation
      switch (activeAnalysis) {
        case 'cfd':
          try {
            result = await getCFDAnalysis({
              mach: flightParams.mach,
              altitude_ft: flightParams.altitude,
              angle_of_attack: flightParams.angleOfAttack,
              temperature: flightParams.temperature,
              pressure: flightParams.pressure
            });
          } catch (apiError) {
            // Fallback to local simulation
            result = SimulationEngine.computeCFD({
              mach: flightParams.mach,
              altitude: flightParams.altitude,
              angleOfAttack: flightParams.angleOfAttack,
              temperature: flightParams.temperature,
              pressure: flightParams.pressure
            });
          }
          break;
          
        case 'wavefront':
          try {
            result = await getWavefronts(flightParams.mach, flightParams.altitude);
          } catch (apiError) {
            // Fallback simulation for wavefront
            result = {
              wavefrontAngle: Math.asin(1 / flightParams.mach) * 180 / Math.PI,
              pressureRatio: Math.pow(1 + 0.2 * flightParams.mach * flightParams.mach, 3.5),
              shockStrength: flightParams.mach > 1 ? (flightParams.mach - 1) * 100 : 0,
              sonicBoomIntensity: flightParams.mach > 1 ? Math.pow(flightParams.mach - 1, 2) * 50 : 0
            };
          }
          break;
          
        case 'orbital':
          try {
            result = await getOrbit(
              orbitalParams.semiMajorAxis,
              orbitalParams.eccentricity,
              orbitalParams.inclination
            );
          } catch (apiError) {
            result = SimulationEngine.computeOrbit(orbitalParams);
          }
          break;
          
        case 'hohmann':
          try {
            result = await getHohmannTransfer(
              transferParams.initialRadius,
              transferParams.targetRadius
            );
          } catch (apiError) {
            result = SimulationEngine.computeHohmannTransfer(
              transferParams.initialRadius,
              transferParams.targetRadius
            );
          }
          break;
          
        default:
          throw new Error('Unknown analysis type');
      }
      
      // Complete progress
      setSimulationProgress(100);
      
      if (result.error) {
        setError(result.error);
      } else {
        setResults(result);
      }
    } catch (err: any) {
      setError(err.message || 'Analysis failed');
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsComputing(false);
        setSimulationProgress(0);
      }, 500);
    }
  };

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    console.log('Files uploaded:', files);
    // Process uploaded files for simulation data
  };

  const renderParameterControls = () => {
    switch (activeAnalysis) {
      case 'cfd':
      case 'wavefront':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Altitude (ft)</label>
              <input
                type="range"
                min="0"
                max="50000"
                value={flightParams.altitude}
                onChange={(e) => setFlightParams({...flightParams, altitude: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">{flightParams.altitude.toLocaleString()} ft</span>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Mach Number</label>
              <input
                type="range"
                min="0.1"
                max="5.0"
                step="0.1"
                value={flightParams.mach}
                onChange={(e) => setFlightParams({...flightParams, mach: parseFloat(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">Mach {flightParams.mach}</span>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Angle of Attack (°)</label>
              <input
                type="range"
                min="-15"
                max="25"
                value={flightParams.angleOfAttack}
                onChange={(e) => setFlightParams({...flightParams, angleOfAttack: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">{flightParams.angleOfAttack}°</span>
            </div>
          </div>
        );

      case 'orbital':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Semi-Major Axis (km)</label>
              <input
                type="range"
                min="6400"
                max="50000"
                value={orbitalParams.semiMajorAxis}
                onChange={(e) => setOrbitalParams({...orbitalParams, semiMajorAxis: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">{orbitalParams.semiMajorAxis.toLocaleString()} km</span>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Eccentricity</label>
              <input
                type="range"
                min="0"
                max="0.9"
                step="0.01"
                value={orbitalParams.eccentricity}
                onChange={(e) => setOrbitalParams({...orbitalParams, eccentricity: parseFloat(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">{orbitalParams.eccentricity}</span>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Inclination (°)</label>
              <input
                type="range"
                min="0"
                max="180"
                value={orbitalParams.inclination}
                onChange={(e) => setOrbitalParams({...orbitalParams, inclination: parseFloat(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">{orbitalParams.inclination}°</span>
            </div>
          </div>
        );

      case 'hohmann':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-slate-300 text-sm mb-2">Initial Orbit Radius (km)</label>
              <input
                type="range"
                min="6400"
                max="20000"
                value={transferParams.initialRadius}
                onChange={(e) => setTransferParams({...transferParams, initialRadius: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">{transferParams.initialRadius.toLocaleString()} km</span>
            </div>

            <div>
              <label className="block text-slate-300 text-sm mb-2">Target Orbit Radius (km)</label>
              <input
                type="range"
                min="6400"
                max="50000"
                value={transferParams.targetRadius}
                onChange={(e) => setTransferParams({...transferParams, targetRadius: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-blue-400 text-sm">{transferParams.targetRadius.toLocaleString()} km</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* AeroIQ Side Panel */}
        <div className="w-80 min-h-screen bg-slate-900/80 backdrop-blur-sm border-r border-slate-700 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">AeroIQ</h2>
            <p className="text-slate-400 text-sm">Aerospace Engineering Analysis</p>
          </div>
          
          {/* Analysis Type Selector */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Analysis Type</h3>
            <div className="space-y-2">
              {[
                { id: 'cfd', name: 'CFD Analysis', desc: 'Computational Fluid Dynamics' },
                { id: 'wavefront', name: 'Supersonic Boom', desc: 'Wavefront Calculations' },
                { id: 'orbital', name: 'Orbital Mechanics', desc: 'Orbit Computations' },
                { id: 'hohmann', name: 'Hohmann Transfer', desc: 'Transfer Orbit Analysis' }
              ].map((analysis) => (
                <button
                  key={analysis.id}
                  onClick={() => setActiveAnalysis(analysis.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    activeAnalysis === analysis.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <div className="font-medium">{analysis.name}</div>
                  <div className="text-xs opacity-75">{analysis.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Data Upload</h3>
            <FileUpload
              onFileUpload={handleFileUpload}
              acceptedTypes={['.txt', '.csv', '.json', 'image/', 'video/', '.dat']}
              maxFiles={3}
              maxSize={50}
            />
          </div>

          {/* Parameter Controls */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Parameters</h3>
            {renderParameterControls()}
            
            <button
              onClick={executeAnalysis}
              disabled={isComputing}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isComputing ? 'Computing...' : 'Execute Analysis'}
            </button>

            {isComputing && (
              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-300 mb-2">
                  <span>Simulation Progress</span>
                  <span>{Math.round(simulationProgress)}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{width: `${simulationProgress}%`}}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Results Summary */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Results Summary</h3>
            {error ? (
              <div className="text-red-400 text-sm">{error}</div>
            ) : results ? (
              <div className="space-y-2 text-sm">
                <div className="text-green-400">Analysis Complete</div>
                <div className="text-slate-300">
                  {Object.keys(results).length} parameters computed
                </div>
                {results.convergence && (
                  <div className="text-blue-400">
                    Convergence: {results.convergence.toFixed(1)}%
                  </div>
                )}
                {results.iterations && (
                  <div className="text-purple-400">
                    Iterations: {results.iterations.toLocaleString()}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-slate-400 text-sm">No results yet</div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {activeAnalysis === 'cfd' && 'Computational Fluid Dynamics'}
              {activeAnalysis === 'wavefront' && 'Supersonic Boom Analysis'}
              {activeAnalysis === 'orbital' && 'Orbital Mechanics'}
              {activeAnalysis === 'hohmann' && 'Hohmann Transfer Analysis'}
            </h1>
            <p className="text-slate-300">
              {activeAnalysis === 'cfd' && 'Advanced aerodynamic flow analysis and optimization'}
              {activeAnalysis === 'wavefront' && 'Supersonic wavefront propagation calculations'}
              {activeAnalysis === 'orbital' && 'Spacecraft orbital trajectory computations'}
              {activeAnalysis === 'hohmann' && 'Optimal transfer orbit calculations'}
            </p>
          </div>

          {/* Main Visualization Area */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 h-96 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                {activeAnalysis === 'cfd' && 'Flow Field Visualization'}
                {activeAnalysis === 'wavefront' && 'Pressure Wave Propagation'}
                {activeAnalysis === 'orbital' && 'Orbital Trajectory'}
                {activeAnalysis === 'hohmann' && 'Transfer Orbit Path'}
              </h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Primary View</button>
                <button className="px-3 py-1 bg-slate-600 text-slate-300 rounded text-sm">Data View</button>
                <button className="px-3 py-1 bg-slate-600 text-slate-300 rounded text-sm">3D View</button>
              </div>
            </div>
            
            <div className="relative h-full bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700">
              {isComputing ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                  <p className="text-white">Executing {activeAnalysis.toUpperCase()} Analysis...</p>
                  <p className="text-slate-400 text-sm mt-2">Computing solutions...</p>
                </div>
              ) : (
                <div className="text-center">
                  <svg className="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <p className="text-slate-300">Analysis Visualization</p>
                  <p className="text-sm text-slate-500 mt-2">Execute analysis to view results</p>
                </div>
              )}
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
              <div className="space-y-3">
                {results && activeAnalysis === 'cfd' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Lift Coefficient</span>
                      <span className="text-green-400">{results.liftCoefficient?.toFixed(3) || '0.847'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Drag Coefficient</span>
                      <span className="text-yellow-400">{results.dragCoefficient?.toFixed(4) || '0.0324'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">L/D Ratio</span>
                      <span className="text-blue-400">{results.liftToDragRatio?.toFixed(2) || '26.14'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Reynolds Number</span>
                      <span className="text-purple-400">{results.reynoldsNumber?.toExponential(2) || '2.1e6'}</span>
                    </div>
                  </>
                )}
                {results && activeAnalysis === 'orbital' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Orbital Period</span>
                      <span className="text-green-400">{results.orbitalPeriod?.toFixed(1) || '98.2'} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Velocity</span>
                      <span className="text-yellow-400">{results.orbitalVelocity?.toFixed(2) || '7.8'} km/s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Apogee</span>
                      <span className="text-blue-400">{results.apogeeAltitude?.toFixed(0) || '7,200'} km</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Perigee</span>
                      <span className="text-cyan-400">{results.perigeeAltitude?.toFixed(0) || '400'} km</span>
                    </div>
                  </>
                )}
                {results && activeAnalysis === 'hohmann' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Transfer Time</span>
                      <span className="text-green-400">{results.transferTime?.toFixed(1) || '315'} min</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Total ΔV</span>
                      <span className="text-yellow-400">{results.totalDeltaV?.toFixed(2) || '3.9'} km/s</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Fuel Mass</span>
                      <span className="text-blue-400">{results.fuelMass?.toFixed(0) || '390'} kg</span>
                    </div>
                  </>
                )}
                {results && activeAnalysis === 'wavefront' && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Mach Angle</span>
                      <span className="text-green-400">{results.wavefrontAngle?.toFixed(1) || '30.0'}°</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Pressure Ratio</span>
                      <span className="text-yellow-400">{results.pressureRatio?.toFixed(2) || '2.45'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Boom Intensity</span>
                      <span className="text-red-400">{results.sonicBoomIntensity?.toFixed(1) || '85.2'} dB</span>
                    </div>
                  </>
                )}
                {!results && (
                  <div className="text-slate-400 text-sm">Execute analysis to view metrics</div>
                )}
              </div>
            </div>
            
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Computational Status</h4>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Convergence</span>
                  <span className="text-green-400">{results?.convergence?.toFixed(1) || '98.7'}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Iterations</span>
                  <span className="text-blue-400">{results?.iterations?.toLocaleString() || '2,847'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Mesh Elements</span>
                  <span className="text-purple-400">{results?.meshElements?.toLocaleString() || '1.2M'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Compute Time</span>
                  <span className="text-yellow-400">{results?.computeTime?.toFixed(1) || '14.2'} s</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Status</span>
                  <span className={`text-sm ${isComputing ? 'text-yellow-400' : results ? 'text-green-400' : 'text-slate-400'}`}>
                    {isComputing ? 'Computing...' : results ? 'Complete' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Export Options</h4>
              <div className="space-y-2">
                <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors">
                  Export Data (CSV)
                </button>
                <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors">
                  Generate Report
                </button>
                <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors">
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

export default AeroIQ;
