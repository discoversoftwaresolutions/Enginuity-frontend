// src/App.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Home       = lazy(() => import("./modules/Home"));
const SimulAI    = lazy(() => import("./modules/SimulAI"));
const VisuAI     = lazy(() => import("./modules/VisuAI"));
const ProtoPrint = lazy(() => import("./modules/ProtoPrint"));
const CircuitIQ  = lazy(() => import("./modules/CircuitIQ"));
const CodeMotion = lazy(() => import("./modules/CodeMotion"));
const FlowCore   = lazy(() => import("./modules/FlowCore"));
const AeroIQ     = lazy(() => import("./modules/AeroIQ"));
const FusionX    = lazy(() => import("./modules/FusionX"));
const NotFound   = lazy(() => import("./modules/NotFound"));

const App: React.FC = () => (
  <Suspense fallback={<div>Loading…</div>}>
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
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  </Suspense>
);

export default App;
