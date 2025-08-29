import React, { useState, useEffect } from "react";
import SimulAI from "./simulai";
import ProtoPrint from "./protoprint";
import FusionX from "./fusionx";
import FlowCore from "./flowcore";
import CodeMotion from "./codemotion";
import CircuitIQ from "./circuitiq";
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
  "CodeMotion - Robotics Code": "codemotion",
