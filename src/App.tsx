// src/App.tsx
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./modules/Home"));

const App: React.FC = () => (
  <Suspense fallback={<div>Loading…</div>}>
    <Home />
  </Suspense>
);

export default App;
