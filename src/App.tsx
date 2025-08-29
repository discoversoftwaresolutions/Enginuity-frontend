import React, { useState, useEffect } from "react";
import SimulAI from "./modules/simulai";
import ProtoPrint from "./modules/protoprint";
import FusionX from "./modules/fusionx";
import FlowCore from "./modules/flowcore";
import CodeMotion from "./modules/codemotion";
import CircuitIQ from "./modules/circuitiq";
import { computeOrbit, computeHohmannTransfer } from "/services/orbital";
import { plotOrbit3D } from "../services/orbital3D";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://enginuity-production.up.railway.app";

const moduleMap = {
  Home: "home",
  "AeroIQ - Aerospace": "aeroiq",
  "FlowCore - Digital Twin & Compliance": "flowcore",
  "FusionX - Energy & Plasma": "fusionx",
  "Simulai - Simulation AI": "simulai",
  "VisuAI - Visual Intelligence": "visuai",
  "ProtoPrint - Additive MFG": "protoprint",
  "CircuitIQ - Electronics": "circuitiq",
  "CodeMotion - Robotics Code": "codemotion"
};

export default function ModuleLoader({ moduleName }: { moduleName: string }) {
  switch (moduleMap[moduleName]) {
    case "simulai":
      return <SimulAI />;
    case "protoprint":
      return <ProtoPrint />;
    case "fusionx":
      return <FusionX />;
    case "flowcore":
      return <FlowCore />;
    case "codemotion":
      return <CodeMotion />;
    case "circuitiq":
      return <CircuitIQ />;
    default:
      return <div>Module not found</div>;
  }
}
