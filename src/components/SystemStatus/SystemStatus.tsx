import React from 'react';

interface SystemStatusProps {
  className?: string;
}

export const SystemStatus: React.FC<SystemStatusProps> = ({ className = '' }) => {
  const systemMetrics = [
    { name: 'AeroIQ', status: 'operational', uptime: '99.8%', load: '23%' },
    { name: 'FlowCore', status: 'operational', uptime: '99.9%', load: '45%' },
    { name: 'FusionX', status: 'maintenance', uptime: '98.2%', load: '12%' },
    { name: 'SimulAI', status: 'operational', uptime: '99.7%', load: '67%' },
    { name: 'VisuAI', status: 'operational', uptime: '99.5%', load: '34%' },
    { name: 'ProtoPrint', status: 'operational', uptime: '99.1%', load: '18%' },
    { name: 'CircuitIQ', status: 'operational', uptime: '99.6%', load: '29%' },
    { name: 'CodeMotion', status: 'operational', uptime: '99.4%', load: '41%' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-500';
      case 'maintenance': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'operational': return '●';
      case 'maintenance': return '◐';
      case 'error': return '●';
      default: return '○';
    }
  };

  return (
    <div className={`bg-white border border-gray-200 rounded-lg p-4 shadow-sm ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
        System Status
      </h3>
      
      <div className="space-y-3">
        {systemMetrics.map((metric) => (
          <div key={metric.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center space-x-3">
              <span className={`text-lg ${getStatusColor(metric.status)}`}>
                {getStatusIndicator(metric.status)}
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
  );
};
