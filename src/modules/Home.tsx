import { Link, useLocation } from "react-router-dom";
import React from "react";
import AeroIQ from "./AeroIQ";
import FlowCore from "./FlowCore";
import FusionX from "./FusionX";
import SimuAI from "./SimuAI";
import VisuAI from "./VisuAI";
import ProntoPrint from "./ProntoPrint";
import CircuitIQ from "./CircuitIQ";
import CodeMotion from "./CodeMotion";
import { SystemStatus } from "./components/SystemStatus";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        {/* Side Panel with Module Cards */}
        <div className="w-80 min-h-screen bg-slate-900/80 backdrop-blur-sm border-r border-slate-700 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">ENGENUITY</h2>
            <p className="text-slate-400 text-sm">Engineering Intelligence Platform</p>
          </div>
          
          {/* Module Cards in Side Panel */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-white mb-4">Engineering Modules</h3>
            {modules.map((module) => (
              <Link
                key={module.path}
                to={module.path}
                className="block p-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-slate-600 rounded-lg transition-all duration-300 hover:bg-slate-800/70"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={module.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{module.name}</h4>
                    <p className="text-xs text-slate-400">{module.category}</p>
                  </div>
                </div>
                <p className="text-slate-300 text-xs mb-2">{module.description}</p>
                <div className="flex flex-wrap gap-1">
                  {module.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs bg-slate-700 text-slate-300 rounded border border-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                  {module.tags.length > 2 && (
                    <span className="px-2 py-1 text-xs text-slate-400">+{module.tags.length - 2}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Area - White Background */}
        <div className="flex-1 p-8 bg-white">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Engineering Intelligence Suite
            </h1>
            <p className="text-xl text-gray-700 mb-2">Advanced computational tools for aerospace and engineering applications</p>
            <p className="text-gray-600">Professional-grade simulation, analysis, and design optimization platform</p>
          </div>

          {/* System Status Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  System Status
                </h3>
                
                <div className="space-y-3">
                  {[
                    { name: 'AeroIQ', status: 'operational', uptime: '99.8%', load: '23%' },
                    { name: 'FlowCore', status: 'operational', uptime: '99.9%', load: '45%' },
                    { name: 'FusionX', status: 'maintenance', uptime: '98.2%', load: '12%' },
                    { name: 'SimulAI', status: 'operational', uptime: '99.7%', load: '67%' },
                    { name: 'VisuAI', status: 'operational', uptime: '99.5%', load: '34%' },
                    { name: 'ProtoPrint', status: 'operational', uptime: '99.1%', load: '18%' },
                    { name: 'CircuitIQ', status: 'operational', uptime: '99.6%', load: '29%' },
                    { name: 'CodeMotion', status: 'operational', uptime: '99.4%', load: '41%' }
                  ].map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center space-x-3">
                        <span className={`text-lg ${
                          metric.status === 'operational' ? 'text-green-500' :
                          metric.status === 'maintenance' ? 'text-yellow-500' : 'text-red-500'
                        }`}>
                          {metric.status === 'operational' ? '●' : metric.status === 'maintenance' ? '◐' : '●'}
                        </span>
                        <span className="text-gray-700 font-medium">{metric.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">Uptime: {metric.uptime}</div>
                        <div className="text-sm text-gray-500">Load: {metric.load}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Total Compute</div>
                      <div className="text-gray-900 font-mono">847.2 TFLOPS</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Memory Usage</div>
                      <div className="text-gray-900 font-mono">2.1 TB / 4.0 TB</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Performance Metrics
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">CPU Utilization</span>
                      <span className="text-gray-900">67%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '67%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Memory Usage</span>
                      <span className="text-gray-900">52%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '52%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Network I/O</span>
                      <span className="text-gray-900">23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{width: '23%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Active Simulations
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">CFD Analysis</span>
                    <span className="text-green-500 text-xs font-medium">Running</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Neural Training</span>
                    <span className="text-yellow-500 text-xs font-medium">Queue</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Circuit Sim</span>
                    <span className="text-blue-500 text-xs font-medium">Idle</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome/Instructions Section */}
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Engenuity</h2>
            <p className="text-gray-700 mb-6">
              Select an engineering module from the side panel to begin your analysis and simulation work.
              Each module provides specialized tools and capabilities for different engineering disciplines.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-2">Aerospace & CFD</h3>
                <p className="text-gray-600 text-sm">Advanced aerodynamic analysis, orbital mechanics, and fluid dynamics simulations</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-2">AI & Machine Learning</h3>
                <p className="text-gray-600 text-sm">Neural networks, predictive modeling, and intelligent optimization algorithms</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-2">Manufacturing & Design</h3>
                <p className="text-gray-600 text-sm">3D printing optimization, circuit design, and rapid prototyping solutions</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <h3 className="text-gray-900 font-semibold mb-2">Robotics & Control</h3>
                <p className="text-gray-600 text-sm">Motion control systems, path planning, and industrial automation</p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-6 text-center shadow-sm">
                <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen">
      {!isHome && (
        <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3 text-white hover:text-blue-400 transition-colors">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <span className="text-xl font-bold">ENGENUITY</span>
              </Link>
              <Link
                to="/"
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors border border-slate-600"
              >
                ← Dashboard
              </Link>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/aeroiq" element={<AeroIQ />} />
        <Route path="/flowcore" element={<FlowCore />} />
        <Route path="/fusionx" element={<FusionX />} />
        <Route path="/simulai" element={<SimulAI />} />
        <Route path="/visuai" element={<VisuAI />} />
        <Route path="/protoprint" element={<ProtoPrint />} />
        <Route path="/circuitiq" element={<CircuitIQ />} />
        <Route path="/codemotion" element={<CodeMotion />} />
      </Routes>
    </div>
  );
};

const Home = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const modules = [
  {
    name: "AeroIQ",
    category: "Aerospace Systems",
    path: "/aeroiq",
    description: "Comprehensive aerospace engineering simulation platform with CFD analysis, flight dynamics modeling, and aerodynamic optimization tools",
    tags: ["CFD Analysis", "Flight Dynamics", "Aerodynamics", "Propulsion"],
    iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
  },
  {
    name: "FlowCore",
    category: "Fluid Dynamics",
    path: "/flowcore",
    description: "Advanced computational fluid dynamics and thermal analysis suite for complex flow simulations and heat transfer calculations",
    tags: ["CFD", "Heat Transfer", "Turbulence", "Multiphase Flow"],
    iconPath: "M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z"
  },
  {
    name: "FusionX",
    category: "Nuclear Engineering",
    path: "/fusionx",
    description: "Nuclear fusion reactor design and plasma physics simulation platform with advanced materials modeling capabilities",
    tags: ["Plasma Physics", "Nuclear Fusion", "Materials Science", "Tokamak Design"],
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  },
  {
    name: "SimulAI",
    category: "Machine Learning",
    path: "/simulai",
    description: "AI-powered engineering simulation platform with machine learning models for predictive analysis and optimization",
    tags: ["Machine Learning", "Neural Networks", "Optimization", "Predictive Analytics"],
    iconPath: "M9 11H7v9a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6z"
  },
  {
    name: "VisuAI",
    category: "Visualization",
    path: "/visuai",
    description: "Professional 3D visualization and computer vision platform for engineering design review and analysis",
    tags: ["3D Visualization", "CAD Integration", "Rendering", "Computer Vision"],
    iconPath: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z"
  },
  {
    name: "ProtoPrint",
    category: "Manufacturing",
    path: "/protoprint",
    description: "Advanced additive manufacturing platform with multi-material 3D printing optimization and process control",
    tags: ["Additive Manufacturing", "Process Optimization", "Material Science", "Quality Control"],
    iconPath: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
  },
  {
    name: "CircuitIQ",
    category: "Electronics",
    path: "/circuitiq",
    description: "Professional electronic design automation platform with circuit simulation, PCB layout, and signal integrity analysis",
    tags: ["Circuit Design", "PCB Layout", "Signal Integrity", "EMC Analysis"],
    iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
  },
  {
    name: "CodeMotion",
    category: "Robotics",
    path: "/codemotion",
    description: "Industrial robotics programming and motion control platform with advanced path planning and safety systems",
    tags: ["Motion Control", "Path Planning", "Industrial Automation", "Safety Systems"],
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
  }
];

const stats = [
  { value: "500K+", label: "Engineers Served" },
  { value: "1M+", label: "Simulations Run" },
  { value: "99.9%", label: "Uptime" },
  { value: "24/7", label: "Support" }
];

export default Home;
