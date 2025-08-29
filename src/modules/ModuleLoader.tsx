import React from "react";
import SimulAI from "./modules/simulai";
import ProtoPrint from "./modules/protoprint";
import FusionX from "./modules/fusionx";
import FlowCore from "./modules/flowcore";
import CodeMotion from "./modules/codemotion";
import CircuitIQ from "./modules/circuitiq";

const moduleMap: Record<string, React.FC> = {
  "Simulai - Simulation AI": SimulAI,
  "ProtoPrint - Additive MFG": ProtoPrint,
  "FusionX - Energy & Plasma": FusionX,
  "FlowCore - Digital Twin & Compliance": FlowCore,
  "CodeMotion - Robotics Code": CodeMotion,
  "CircuitIQ - Electronics": CircuitIQ
};

export default function ModuleLoader({ moduleName }: { moduleName: string }) {
  const ModuleComponent = moduleMap[moduleName];
  return ModuleComponent ? <ModuleComponent /> : <div>Module not found</div>;
}
