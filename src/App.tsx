import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Link, Outlet } from "react-router-dom";

const Home          = lazy(() => import("./modules/Home"));
const SimulAI       = lazy(() => import("./modules/SimulAI"));
const VisuAI        = lazy(() => import("./modules/VisuAI"));
const ProtoPrint    = lazy(() => import("./modules/ProtoPrint"));
const CircuitIQ     = lazy(() => import("./modules/CircuitIQ"));
const CodeMotion    = lazy(() => import("./modules/CodeMotion"));
const FlowCore      = lazy(() => import("./modules/FlowCore"));
const AeroIQ        = lazy(() => import("./modules/AeroIQ"));
const FusionX       = lazy(() => import("./modules/FusionX"));
const LayoutPreview = lazy(() => import("./modules/LayoutPreview"));
const NotFound      = lazy(() => import("./modules/NotFound"));

const Shell: React.FC = () => (
  <>
    <header style={{padding:"12px 16px", borderBottom:"1px solid #e5e7eb", display:"flex", gap:12, flexWrap:"wrap"}}>
      <Link to="/">Home</Link>
      <Link to="/simulai">SimulAI</Link>
      <Link to="/visuai">VisuAI</Link>
      <Link to="/protoprint">ProtoPrint</Link>
      <Link to="/circuitiq">CircuitIQ</Link>
      <Link to="/codemotion">CodeMotion</Link>
      <Link to="/flowcore">FlowCore</Link>
      <Link to="/aeroiq">AeroIQ</Link>
      <Link to="/fusionx">FusionX</Link>
      <Link to="/layout-preview">Layout Preview</Link>
    </header>
    <main style={{padding:"16px"}}>
      <Outlet />
    </main>
  </>
);

const App: React.FC = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Routes>
      <Route element={<Shell />}>
        <Route index element={<Home />} />
        <Route path="simulai" element={<SimulAI />} />
        <Route path="visuai" element={<VisuAI />} />
        <Route path="protoprint" element={<ProtoPrint />} />
        <Route path="circuitiq" element={<CircuitIQ />} />
        <Route path="codemotion" element={<CodeMotion />} />
        <Route path="flowcore" element={<FlowCore />} />
        <Route path="aeroiq" element={<AeroIQ />} />
        <Route path="fusionx" element={<FusionX />} />
        <Route path="layout-preview" element={<LayoutPreview />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  </Suspense>
);

export default App;
