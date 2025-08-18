import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './modules/Home';
import SimulAI from './modules/SimulAI';
import VisuAI from './modules/VisuAI';
import ProtoPrint from './modules/ProtoPrint';
import CircuitIQ from './modules/CircuitIQ';
import CodeMotion from './modules/CodeMotion';
import FlowCore from './modules/FlowCore';
import AeroIQ from './modules/AeroIQ';
import FusionX from './modules/FusionX';
import LayoutPreview from './modules/LayoutPreview';
import NotFound from './modules/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/simulai" element={<SimulAI />} />
      <Route path="/visuai" element={<VisuAI />} />
      <Route path="/protoprint" element={<ProtoPrint />} />
      <Route path="/circuitiq" element={<CircuitIQ />} />
      <Route path="/codemotion" element={<CodeMotion />} />
      <Route path="/flowcore" element={<FlowCore />} />
      <Route path="/aeroiq" element={<AeroIQ />} />
      <Route path="/fusionx" element={<FusionX />} />
      <Route path="/layout-preview" element={<LayoutPreview />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
};

export default App;
