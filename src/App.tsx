import React from "react";
import ModuleLoader from "./modules/ModuleLoader";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Enginuity Modules</h1>
      {/* Replace "Simulai - Simulation AI" with any valid module name from moduleMap */}
      <ModuleLoader moduleName="Simulai - Simulation AI" />
    </div>
  );
}

export default App;
