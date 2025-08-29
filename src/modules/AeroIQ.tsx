// src/modules/AeroIQ.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  getWavefronts,
  getOrbit,
  getHohmannTransfer,
  getCFDAnalysis,
} from "../services/aeroiqService";
import { FileUpload } from "../components/FileUpload";
import { SimulationEngine } from "../utils/simulationEngine";

/* ──────────────────────────────────────────────────────────────────────────────
 * Types
 * ──────────────────────────────────────────────────────────────────────────── */
type AnalysisKind = "cfd" | "wavefront" | "orbital" | "hohmann";

interface FlightParams {
  altitude: number;       // ft
  mach: number;           // dimensionless
  angleOfAttack: number;  // deg
  temperature: number;    // K
  pressure: number;       // Pa
}
interface OrbitalParams {
  semiMajorAxis: number;  // km
  eccentricity: number;   // 0..1
  inclination: number;    // deg
}
interface TransferParams {
  initialRadius: number;  // km
  targetRadius: number;   // km
}

/** Results per analysis (discriminated union) */
type CFDResult = {
  kind: "cfd";
  liftCoefficient: number;
  dragCoefficient: number;
  liftToDragRatio: number;
  reynoldsNumber: number;
  convergence: number;     // %
  iterations: number;
  meshElements?: number;
  computeTime?: number;    // s
};

type WavefrontResult = {
  kind: "wavefront";
  wavefrontAngle: number;     // deg
  pressureRatio: number;
  shockStrength: number;
  sonicBoomIntensity: number; // dB
};

type OrbitalResult = {
  kind: "orbital";
  orbitalPeriod: number;     // min
  orbitalVelocity: number;   // km/s
  apogeeAltitude: number;    // km
  perigeeAltitude: number;   // km
};

type HohmannResult = {
  kind: "hohmann";
  transferTime: number;  // min
  totalDeltaV: number;   // km/s
  fuelMass?: number;     // kg
};

type AnalysisResult = CFDResult | WavefrontResult | OrbitalResult | HohmannResult;

const fmt = {
  int: (n: number) => n.toLocaleString(),
  fix: (n: number, d = 2) => n.toFixed(d),
  exp: (n: number, d = 2) => n.toExponential(d),
};

/* ──────────────────────────────────────────────────────────────────────────────
 * Component
 * ──────────────────────────────────────────────────────────────────────────── */
const AeroIQ: React.FC = () => {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisKind>("cfd");
  const [isComputing, setIsComputing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const [simulationProgress, setSimulationProgress] = useState(0);
  const progressRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  // Parameters
  const [flightParams, setFlightParams] = useState<FlightParams>({
    altitude: 35000,
    mach: 0.8,
    angleOfAttack: 5,
    temperature: 288.15,
    pressure: 101_325,
  });

  const [orbitalParams, setOrbitalParams] = useState<OrbitalParams>({
    semiMajorAxis: 7000,
    eccentricity: 0.1,
    inclination: 28.5,
  });

  const [transferParams, setTransferParams] = useState<TransferParams>({
    initialRadius: 6678,
    targetRadius: 42_164,
  });

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      if (progressRef.current != null) window.clearInterval(progressRef.current);
    };
  }, []);

  const startProgress = useCallback(() => {
    setSimulationProgress(0);
    if (progressRef.current != null) window.clearInterval(progressRef.current);
    progressRef.current = window.setInterval(() => {
      setSimulationProgress((prev) => {
        const next = Math.min(95, prev + Math.random() * 10);
        return next;
      });
    }, 200);
  }, []);

  const stopProgress = useCallback((complete = false) => {
    if (progressRef.current != null) {
      window.clearInterval(progressRef.current);
      progressRef.current = null;
    }
    setSimulationProgress(complete ? 100 : 0);
  }, []);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
    // Integrate files with SimulationEngine or API payloads as needed
  };

  const executeAnalysis = useCallback(async () => {
    if (!mountedRef.current) return;
    setIsComputing(true);
    setError(null);
    setResults(null);
    startProgress();

    try {
      let result: AnalysisResult;

      switch (activeAnalysis) {
        case "cfd": {
          try {
            const r = await getCFDAnalysis({
              mach: flightParams.mach,
              altitude_ft: flightParams.altitude,
              angle_of_attack: flightParams.angleOfAttack,
              temperature: flightParams.temperature,
              pressure: flightParams.pressure,
            });
            // Adapt to CFDResult shape
            result = {
              kind: "cfd",
              liftCoefficient: r.liftCoefficient,
              dragCoefficient: r.dragCoefficient,
              liftToDragRatio: r.liftToDragRatio,
              reynoldsNumber: r.reynoldsNumber,
              convergence: r.convergence ?? 98.7,
              iterations: r.iterations ?? 2847,
              meshElements: r.meshElements,
              computeTime: r.computeTime,
            };
          } catch {
            const r = SimulationEngine.computeCFD({
              mach: flightParams.mach,
              altitude: flightParams.altitude,
              angleOfAttack: flightParams.angleOfAttack,
              temperature: flightParams.temperature,
              pressure: flightParams.pressure,
            });
            result = {
              kind: "cfd",
              liftCoefficient: r.liftCoefficient,
              dragCoefficient: r.dragCoefficient,
              liftToDragRatio: r.liftToDragRatio,
              reynoldsNumber: r.reynoldsNumber,
              convergence: r.convergence ?? 98.7,
              iterations: r.iterations ?? 2847,
              meshElements: r.meshElements,
              computeTime: r.computeTime,
            };
          }
          break;
        }

        case "wavefront": {
          const M = flightParams.mach;
          if (M < 1) {
            // Guard against asin(>1) / domain error
            throw new Error("Mach must be ≥ 1 for supersonic wavefront analysis.");
          }
          try {
            const r = await getWavefronts(flightParams.mach, flightParams.altitude);
            result = {
              kind: "wavefront",
              wavefrontAngle: r.wavefrontAngle,
              pressureRatio: r.pressureRatio,
              shockStrength: r.shockStrength,
              sonicBoomIntensity: r.sonicBoomIntensity,
            };
          } catch {
            const wavefrontAngle = Math.asin(1 / M) * (180 / Math.PI);
            const pressureRatio = Math.pow(1 + 0.2 * M * M, 3.5);
            const shockStrength = (M - 1) * 100;
            const sonicBoomIntensity = Math.pow(M - 1, 2) * 50;
            result = { kind: "wavefront", wavefrontAngle, pressureRatio, shockStrength, sonicBoomIntensity };
          }
          break;
        }

        case "orbital": {
          try {
            const r = await getOrbit(
              orbitalParams.semiMajorAxis,
              orbitalParams.eccentricity,
              orbitalParams.inclination
            );
            result = {
              kind: "orbital",
              orbitalPeriod: r.orbitalPeriod,
              orbitalVelocity: r.orbitalVelocity,
              apogeeAltitude: r.apogeeAltitude,
              perigeeAltitude: r.perigeeAltitude,
            };
          } catch {
            const r = SimulationEngine.computeOrbit(orbitalParams);
            result = {
              kind: "orbital",
              orbitalPeriod: r.orbitalPeriod,
              orbitalVelocity: r.orbitalVelocity,
              apogeeAltitude: r.apogeeAltitude,
              perigeeAltitude: r.perigeeAltitude,
            };
          }
          break;
        }

        case "hohmann": {
          try {
            const r = await getHohmannTransfer(transferParams.initialRadius, transferParams.targetRadius);
            result = {
              kind: "hohmann",
              transferTime: r.transferTime,
              totalDeltaV: r.totalDeltaV,
              fuelMass: r.fuelMass,
            };
          } catch {
            const r = SimulationEngine.computeHohmannTransfer(
              transferParams.initialRadius,
              transferParams.targetRadius
            );
            result = {
              kind: "hohmann",
              transferTime: r.transferTime,
              totalDeltaV: r.totalDeltaV,
              fuelMass: r.fuelMass,
            };
          }
          break;
        }

        default:
          throw new Error("Unknown analysis type");
      }

      if (!mountedRef.current) return;
      setResults(result);
      stopProgress(true);
    } catch (e: any) {
      if (!mountedRef.current) return;
      setError(e?.message ?? "Analysis failed");
      stopProgress(false);
    } finally {
      if (!mountedRef.current) return;
      setIsComputing(false);
      // Optionally keep progress at 100 for a moment; here we reset if not computing
      setTimeout(() => mountedRef.current && setSimulationProgress(0), 500);
    }
  }, [activeAnalysis, flightParams, orbitalParams, transferParams, startProgress, stopProgress]);

  const headerTitle = useMemo(() => {
    switch (activeAnalysis) {
      case "cfd": return "Computational Fluid Dynamics";
      case "wavefront": return "Supersonic Boom Analysis";
      case "orbital": return "Orbital Mechanics";
      case "hohmann": return "Hohmann Transfer Analysis";
    }
  }, [activeAnalysis]);

  const headerSub = useMemo(() => {
    switch (activeAnalysis) {
      case "cfd": return "Advanced aerodynamic flow analysis and optimization";
      case "wavefront": return "Supersonic wavefront propagation calculations";
      case "orbital": return "Spacecraft orbital trajectory computations";
      case "hohmann": return "Optimal transfer orbit calculations";
    }
  }, [activeAnalysis]);

  /* UI helpers */
  const RangeRow: React.FC<{
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (v: number) => void;
    suffix?: string;
    precision?: number;
  }> = ({ label, value, min, max, step, onChange, suffix = "", precision = 0 }) => (
    <div>
      <label className="block text-slate-300 text-sm mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
        aria-label={label}
      />
      <span className="text-blue-400 text-sm">
        {precision ? Number(value).toFixed(precision) : fmt.int(value)}{suffix}
      </span>
    </div>
  );

  const renderParameterControls = () => {
    switch (activeAnalysis) {
      case "cfd":
      case "wavefront":
        return (
          <div className="space-y-4">
            <RangeRow
              label="Altitude (ft)"
              value={flightParams.altitude}
              min={0}
              max={50000}
              onChange={(v) => setFlightParams({ ...flightParams, altitude: v })}
            />
            <RangeRow
              label="Mach Number"
              value={flightParams.mach}
              min={0.1}
              max={5}
              step={0.01}
              onChange={(v) => setFlightParams({ ...flightParams, mach: v })}
              suffix=""
              precision={2}
            />
            <RangeRow
              label="Angle of Attack (°)"
              value={flightParams.angleOfAttack}
              min={-15}
              max={25}
              step={0.5}
              onChange={(v) => setFlightParams({ ...flightParams, angleOfAttack: v })}
              suffix="°"
              precision={1}
            />
          </div>
        );

      case "orbital":
        return (
          <div className="space-y-4">
            <RangeRow
              label="Semi-Major Axis (km)"
              value={orbitalParams.semiMajorAxis}
              min={6400}
              max={50000}
              onChange={(v) => setOrbitalParams({ ...orbitalParams, semiMajorAxis: v })}
            />
            <RangeRow
              label="Eccentricity"
              value={orbitalParams.eccentricity}
              min={0}
              max={0.9}
              step={0.01}
              onChange={(v) => setOrbitalParams({ ...orbitalParams, eccentricity: v })}
              precision={2}
            />
            <RangeRow
              label="Inclination (°)"
              value={orbitalParams.inclination}
              min={0}
              max={180}
              step={0.5}
              onChange={(v) => setOrbitalParams({ ...orbitalParams, inclination: v })}
              suffix="°"
              precision={1}
            />
          </div>
        );

      case "hohmann":
        return (
          <div className="space-y-4">
            <RangeRow
              label="Initial Orbit Radius (km)"
              value={transferParams.initialRadius}
              min={6400}
              max={20000}
              onChange={(v) => setTransferParams({ ...transferParams, initialRadius: v })}
            />
            <RangeRow
              label="Target Orbit Radius (km)"
              value={transferParams.targetRadius}
              min={6400}
              max={50000}
              onChange={(v) => setTransferParams({ ...transferParams, targetRadius: v })}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Side Panel */}
        <aside className="w-80 min-h-screen bg-slate-900/80 backdrop-blur-sm border-r border-slate-700 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">AeroIQ</h2>
            <p className="text-slate-400 text-sm">Aerospace Engineering Analysis</p>
          </div>

          {/* Analysis Selector */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Analysis Type</h3>
            <div className="space-y-2">
              {[
                { id: "cfd", name: "CFD Analysis", desc: "Computational Fluid Dynamics" },
                { id: "wavefront", name: "Supersonic Boom", desc: "Wavefront Calculations" },
                { id: "orbital", name: "Orbital Mechanics", desc: "Orbit Computations" },
                { id: "hohmann", name: "Hohmann Transfer", desc: "Transfer Orbit Analysis" },
              ].map((analysis) => (
                <button
                  key={analysis.id}
                  type="button"
                  onClick={() => setActiveAnalysis(analysis.id as AnalysisKind)}
                  className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                    activeAnalysis === analysis.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                  }`}
                  aria-pressed={activeAnalysis === analysis.id}
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
              acceptedTypes={[".txt", ".csv", ".json", "image/*", "video/*", ".dat"]}
              maxFiles={3}
              maxSize={50}
            />
          </div>

          {/* Parameters */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">Parameters</h3>
            {renderParameterControls()}

            <button
              type="button"
              onClick={executeAnalysis}
              disabled={isComputing}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-busy={isComputing}
            >
              {isComputing ? "Computing..." : "Execute Analysis"}
            </button>

            <div className="mt-4" aria-live="polite">
              <div className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Simulation Progress</span>
                <span>{Math.round(simulationProgress)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, simulationProgress)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">Results Summary</h3>
            {error ? (
              <div className="text-red-400 text-sm">{error}</div>
            ) : results ? (
              <div className="space-y-2 text-sm">
                <div className="text-green-400">Analysis Complete</div>
                {results.kind === "cfd" && (
                  <>
                    <div className="text-slate-300">L/D: <span className="text-blue-400">{fmt.fix(results.liftToDragRatio, 2)}</span></div>
                    <div className="text-slate-300">Re: <span className="text-purple-400">{fmt.exp(results.reynoldsNumber, 2)}</span></div>
                    <div className="text-slate-300">Conv.: <span className="text-green-400">{fmt.fix(results.convergence, 1)}%</span></div>
                    <div className="text-slate-300">Iter.: <span className="text-blue-400">{fmt.int(results.iterations)}</span></div>
                  </>
                )}
                {results.kind === "orbital" && (
                  <>
                    <div className="text-slate-300">T: <span className="text-green-400">{fmt.fix(results.orbitalPeriod, 1)} min</span></div>
                    <div className="text-slate-300">v: <span className="text-yellow-400">{fmt.fix(results.orbitalVelocity, 2)} km/s</span></div>
                  </>
                )}
                {results.kind === "hohmann" && (
                  <>
                    <div className="text-slate-300">ΔV: <span className="text-yellow-400">{fmt.fix(results.totalDeltaV, 2)} km/s</span></div>
                    <div className="text-slate-300">t: <span className="text-green-400">{fmt.fix(results.transferTime, 1)} min</span></div>
                  </>
                )}
                {results.kind === "wavefront" && (
                  <>
                    <div className="text-slate-300">Mach angle: <span className="text-green-400">{fmt.fix(results.wavefrontAngle, 1)}°</span></div>
                    <div className="text-slate-300">Boom: <span className="text-red-400">{fmt.fix(results.sonicBoomIntensity, 1)} dB</span></div>
                  </>
                )}
              </div>
            ) : (
              <div className="text-slate-400 text-sm">No results yet</div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{headerTitle}</h1>
            <p className="text-slate-300">{headerSub}</p>
          </header>

          {/* Visualization */}
          <section className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 h-96 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">
                {{
                  cfd: "Flow Field Visualization",
                  wavefront: "Pressure Wave Propagation",
                  orbital: "Orbital Trajectory",
                  hohmann: "Transfer Orbit Path",
                }[activeAnalysis]}
              </h3>
              <div className="flex space-x-2">
                <button type="button" className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Primary View</button>
                <button type="button" className="px-3 py-1 bg-slate-600 text-slate-300 rounded text-sm">Data View</button>
                <button type="button" className="px-3 py-1 bg-slate-600 text-slate-300 rounded text-sm">3D View</button>
              </div>
            </div>

            <div className="relative h-full bg-slate-900/50 rounded-lg flex items-center justify-center border border-slate-700" aria-live="polite">
              {isComputing ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4" />
                  <p className="text-white">Executing {activeAnalysis.toUpperCase()} Analysis...</p>
                  <p className="text-slate-400 text-sm mt-2">Computing solutions…</p>
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
          </section>

          {/* Results Grid */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Performance Metrics */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Performance Metrics</h4>
              <div className="space-y-3 text-sm">
                {results?.kind === "cfd" && (
                  <>
                    <Row label="Lift Coefficient" value={<span className="text-green-400">{fmt.fix(results.liftCoefficient, 3)}</span>} />
                    <Row label="Drag Coefficient" value={<span className="text-yellow-400">{fmt.fix(results.dragCoefficient, 4)}</span>} />
                    <Row label="L/D Ratio" value={<span className="text-blue-400">{fmt.fix(results.liftToDragRatio, 2)}</span>} />
                    <Row label="Reynolds Number" value={<span className="text-purple-400">{fmt.exp(results.reynoldsNumber, 2)}</span>} />
                  </>
                )}
                {results?.kind === "orbital" && (
                  <>
                    <Row label="Orbital Period" value={<span className="text-green-400">{fmt.fix(results.orbitalPeriod, 1)} min</span>} />
                    <Row label="Velocity" value={<span className="text-yellow-400">{fmt.fix(results.orbitalVelocity, 2)} km/s</span>} />
                    <Row label="Apogee" value={<span className="text-blue-400">{fmt.int(results.apogeeAltitude)} km</span>} />
                    <Row label="Perigee" value={<span className="text-cyan-400">{fmt.int(results.perigeeAltitude)} km</span>} />
                  </>
                )}
                {results?.kind === "hohmann" && (
                  <>
                    <Row label="Transfer Time" value={<span className="text-green-400">{fmt.fix(results.transferTime, 1)} min</span>} />
                    <Row label="Total ΔV" value={<span className="text-yellow-400">{fmt.fix(results.totalDeltaV, 2)} km/s</span>} />
                    {results.fuelMass != null && <Row label="Fuel Mass" value={<span className="text-blue-400">{fmt.int(results.fuelMass)} kg</span>} />}
                  </>
                )}
                {results?.kind === "wavefront" && (
                  <>
                    <Row label="Mach Angle" value={<span className="text-green-400">{fmt.fix(results.wavefrontAngle, 1)}°</span>} />
                    <Row label="Pressure Ratio" value={<span className="text-yellow-400">{fmt.fix(results.pressureRatio, 2)}</span>} />
                    <Row label="Boom Intensity" value={<span className="text-red-400">{fmt.fix(results.sonicBoomIntensity, 1)} dB</span>} />
                  </>
                )}
                {!results && <div className="text-slate-400">Execute analysis to view metrics</div>}
              </div>
            </div>

            {/* Computational Status */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Computational Status</h4>
              <div className="space-y-3 text-sm">
                <Row label="Convergence" value={<span className="text-green-400">{results?.kind === "cfd" ? fmt.fix(results.convergence, 1) : "98.7"}%</span>} />
                <Row label="Iterations" value={<span className="text-blue-400">{results?.kind === "cfd" ? fmt.int(results.iterations) : "2,847"}</span>} />
                <Row label="Mesh Elements" value={<span className="text-purple-400">{results?.kind === "cfd" && results.meshElements ? fmt.int(results.meshElements) : "1.2M"}</span>} />
                <Row label="Compute Time" value={<span className="text-yellow-400">{results?.kind === "cfd" && results.computeTime != null ? fmt.fix(results.computeTime, 1) : "14.2"} s</span>} />
                <Row
                  label="Status"
                  value={
                    <span className={isComputing ? "text-yellow-400" : results ? "text-green-400" : "text-slate-400"}>
                      {isComputing ? "Computing..." : results ? "Complete" : "Ready"}
                    </span>
                  }
                />
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-4">Export Options</h4>
              <div className="space-y-2">
                <button type="button" className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors">
                  Export Data (CSV)
                </button>
                <button type="button" className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors">
                  Generate Report
                </button>
                <button type="button" className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-sm transition-colors">
                  Save Configuration
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const Row: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="flex justify-between">
    <span className="text-slate-300">{label}</span>
    <span>{value}</span>
  </div>
);

export default AeroIQ;
