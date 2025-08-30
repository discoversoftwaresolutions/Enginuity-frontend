import React, { useEffect, useMemo, useState } from "react";

/* =======================================================
   0) GLOBAL STYLE INJECTION (no Tailwind needed)
   ======================================================= */
function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById("engenuity-inline-styles")) return;
  const style = document.createElement("style");
  style.id = "engenuity-inline-styles";
  style.textContent = `
:root{
  --bg1:#0b1220; --bg2:#0e1424; --panel:#0f172a; --panel-2:#111a2e;
  --line:#1f2a44; --muted:#a3b2c7; --text:#e6edf6; --title:#f1f5f9;
  --blue-500:#3b82f6; --blue-600:#2563eb; --blue-700:#1d4ed8;
  --green-500:#22c55e; --yellow-500:#eab308; --red-500:#ef4444;
  --shadow:0 14px 40px rgba(0,0,0,.35);
}
*{box-sizing:border-box}
html,body,#root{height:100%;margin:0}
body{background:linear-gradient(135deg,var(--bg1),var(--bg2));color:var(--text);font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:.2px}

/* Shell */
.app{
  min-height:100%;
  height:100vh;
  display:grid;
  grid-template-columns:320px 1fr;
  grid-template-rows:64px 1fr;
  grid-template-areas:"sidebar header" "sidebar main";
}

/* Top bar */
.topbar{
  grid-area:header;
  display:flex;align-items:center;justify-content:space-between;
  height:64px;padding:0 18px;border-bottom:1px solid var(--line);
  backdrop-filter:saturate(140%) blur(4px);
  background:linear-gradient(180deg,rgba(2,6,23,.7),rgba(2,6,23,.4));
  position:sticky; top:0; z-index:50;
}
.brand-inline{display:flex;align-items:center;gap:12px;color:#fff;text-decoration:none}
.logo-sq{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--blue-600),var(--blue-700));display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow)}
.brand-name{font-weight:900;letter-spacing:.6px}
.btn{border:1px solid var(--line);background:#0b1324;color:#c9d4ea;border-radius:10px;padding:8px 12px;font-weight:700;cursor:pointer}
.btn:hover{background:#101a2a}

/* Sidebar */
.sidebar{
  grid-area:sidebar; grid-row:1 / span 2;
  height:100vh;
  background:linear-gradient(180deg,rgba(15,23,42,.95),rgba(15,23,42,.88));
  border-right:1px solid var(--line); padding:18px;
  position:sticky; top:0;
  overflow-y:auto;
}
.sb-head{margin-bottom:12px}
.sb-title{font-size:20px;font-weight:900}
.sb-sub{color:var(--muted);font-size:12px;margin-top:4px}
.sb-section{margin-top:14px;color:#cdd7ea;font-size:13px;font-weight:800;letter-spacing:.8px;opacity:.95}

/* Module tiles */
.mod{margin-top:10px;display:flex;flex-direction:column;gap:10px}
.tile{
  border:1px solid var(--line);background:linear-gradient(180deg,rgba(30,41,59,.6),rgba(15,23,42,.8));
  border-radius:14px;padding:12px;cursor:pointer;transition:transform .08s ease,background .18s ease,border-color .18s ease;
}
.tile:hover{transform:translateY(-1px);border-color:#3b4b6a}
.tile.active{background:linear-gradient(180deg,#12203b,#0f1a30);border-color:#51648c;box-shadow:var(--shadow)}
.tile-top{display:flex;align-items:center;margin-bottom:8px}
.tile-ico{width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,var(--blue-500),var(--blue-600));display:flex;align-items:center;justify-content:center;margin-right:12px}
.tile-name{font-weight:800;color:#fff}
.tile-cat{font-size:12px;color:#8797b4}
.tile-desc{color:#c3cde0;font-size:12px;margin:8px 0}
.tag{display:inline-flex;align-items:center;padding:4px 8px;border-radius:999px;border:1px solid #2b3853;background:#101a2a;color:#c9d4ea;font-size:11px;margin-right:6px;margin-top:6px}

/* Main */
.main{grid-area:main;padding:18px;overflow:auto}
.section{max-width:1320px;margin:0 auto}

/* Cards & Panels */
.panel{background:var(--panel);border:1px solid var(--line);border-radius:14px;padding:14px;box-shadow:var(--shadow)}
.panel h2{margin:0 0 10px 0;color:var(--title);font-size:18px;letter-spacing:.4px}
.grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px}
.grid-2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.card{background:var(--panel-2);border:1px solid var(--line);border-radius:12px;padding:12px}
.card h3{margin:0 0 8px 0;font-size:13px;color:#cdd7ea;letter-spacing:.4px;text-transform:uppercase}
.num{font-size:28px;font-weight:900;color:#fff}
.kv{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #172541}
.kv:last-child{border-bottom:none}

/* Status & visuals */
.status-ok{color:var(--green-500);font-weight:800}
.status-warn{color:var(--yellow-500);font-weight:800}
.status-bad{color:var(--red-500);font-weight:800}
.bar{height:10px;background:#0f1a30;border:1px solid #1e2b47;border-radius:999px;overflow:hidden}
.bar>div{height:100%;background:linear-gradient(90deg,#4ba1ff,#2563eb)}
.dot{width:8px;height:8px;border-radius:999px;background:var(--green-500);animation:pulse 1.2s infinite}
.pill{display:inline-flex;align-items:center;gap:8px;border-radius:999px;padding:6px 10px;border:1px solid var(--line);font-weight:700;font-size:12px;background:#0b1324}
@keyframes pulse{0%{opacity:.85}50%{opacity:.35}100%{opacity:.85}}

/* Login */
.login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.login-card{width:100%;max-width:420px;background:var(--panel);border:1px solid var(--line);border-radius:16px;box-shadow:var(--shadow);padding:20px}
.input{width:100%;padding:10px 12px;border-radius:10px;border:1px solid #223456;background:#0b1324;color:#e6edf6;outline:none}
.input:focus{border-color:#3b82f6}
.input-row{display:flex;gap:10px}
.helper{font-size:12px;color:#a3b2c7;margin-top:8px}

/* Responsive */
@media (max-width: 1200px){
  .app{grid-template-columns: 96px 1fr}
  .sb-sub,.tile-desc,.brand-name,.tile-cat{display:none}
  .grid-3{grid-template-columns:1fr}
  .grid-2{grid-template-columns:1fr}
}
`;
  document.head.appendChild(style);
}

/* =======================================================
   1) TYPES & MODULES
   ======================================================= */
type ModuleDef = {
  key: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  iconPath: string;
  status: "operational" | "maintenance" | "degraded";
  uptime: string;
  load: string;
  version: string;
};

const MODULES: ModuleDef[] = [
  {
    key: "aeroiq",
    name: "AeroIQ",
    category: "Aerospace Systems",
    description:
      "Comprehensive aerospace engineering simulation platform with CFD analysis, flight dynamics modeling, and aerodynamic optimization tools.",
    tags: ["CFD Analysis", "Flight Dynamics", "Aerodynamics", "Propulsion"],
    iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    status: "operational",
    uptime: "99.8%",
    load: "23%",
    version: "2.4.1"
  },
  {
    key: "flowcore",
    name: "FlowCore",
    category: "Fluid Dynamics",
    description:
      "Advanced computational fluid dynamics and thermal analysis suite for complex flow simulations and heat transfer calculations.",
    tags: ["CFD", "Heat Transfer", "Turbulence", "Multiphase Flow"],
    iconPath:
      "M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7Z",
    status: "operational",
    uptime: "99.9%",
    load: "45%",
    version: "1.9.0"
  },
  {
    key: "fusionx",
    name: "FusionX",
    category: "Nuclear Engineering",
    description:
      "Nuclear fusion reactor design and plasma physics simulation platform with advanced materials modeling capabilities.",
    tags: ["Plasma Physics", "Nuclear Fusion", "Materials Science", "Tokamak Design"],
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    status: "maintenance",
    uptime: "98.2%",
    load: "12%",
    version: "0.9.7"
  },
  {
    key: "simulai",
    name: "SimulAI",
    category: "Machine Learning",
    description:
      "AI-powered engineering simulation platform with machine learning models for predictive analysis and optimization.",
    tags: ["Machine Learning", "Neural Networks", "Optimization", "Predictive Analytics"],
    iconPath: "M9 11H7v9a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2h-3V5a2 2 0 00-2-2H9a2 2 0 00-2 2v6z",
    status: "operational",
    uptime: "99.7%",
    load: "67%",
    version: "3.1.2"
  },
  {
    key: "visuai",
    name: "VisuAI",
    category: "Visualization",
    description:
      "Professional 3D visualization and computer vision platform for engineering design review and analysis.",
    tags: ["3D Visualization", "CAD Integration", "Rendering", "Computer Vision"],
    iconPath: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 9a3 3 0 100 6 3 3 0 000-6z",
    status: "operational",
    uptime: "99.5%",
    load: "34%",
    version: "4.0.0"
  },
  {
    key: "protoprint",
    name: "ProtoPrint",
    category: "Manufacturing",
    description:
      "Advanced additive manufacturing platform with multi-material 3D printing optimization and process control.",
    tags: ["Additive Manufacturing", "Process Optimization", "Material Science", "Quality Control"],
    iconPath: "M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zM12 19c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
    status: "operational",
    uptime: "99.1%",
    load: "18%",
    version: "1.3.5"
  },
  {
    key: "circuitiq",
    name: "CircuitIQ",
    category: "Electronics",
    description:
      "Professional EDA platform with circuit simulation, PCB layout, and signal integrity analysis.",
    tags: ["Circuit Design", "PCB Layout", "Signal Integrity", "EMC Analysis"],
    iconPath: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    status: "operational",
    uptime: "99.6%",
    load: "29%",
    version: "5.8.2"
  },
  {
    key: "codemotion",
    name: "CodeMotion",
    category: "Robotics",
    description:
      "Industrial robotics programming and motion control with advanced path planning and safety systems.",
    tags: ["Motion Control", "Path Planning", "Automation", "Safety Systems"],
    iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
    status: "degraded",
    uptime: "99.0%",
    load: "41%",
    version: "2.2.0"
  },
  {
    key: "billing",
    name: "Billing & Payments",
    category: "Account",
    description:
      "Manage plans, metered usage, payment methods, and invoices. Industry-specific tiers with GPU/simulation/API metering.",
    tags: ["Plans", "Usage", "Invoices", "Payments"],
    iconPath: "M3 7h18M3 12h18M3 17h18",
    status: "operational",
    uptime: "—",
    load: "—",
    version: "1.0.0"
  }
];

const SYSTEM_FEED = [
  { id:"ev1", text:"CFD solver kernel updated (+8% throughput)", ts:"12:04Z" },
  { id:"ev2", text:"GPU nodes provisioned for SimulAI (4x A100)", ts:"11:58Z" },
  { id:"ev3", text:"FusionX material DB sync complete", ts:"11:52Z" },
  { id:"ev4", text:"ProtoPrint QA ruleset v1.3 applied", ts:"11:46Z" },
];

/* =======================================================
   2) SMALL HELPERS
   ======================================================= */
const cls = (...p: Array<string | false | null | undefined>) => p.filter(Boolean).join(" ");
const statusClass = (s: ModuleDef["status"]) =>
  s === "operational" ? "status-ok" : s === "maintenance" ? "status-warn" : "status-bad";

/* =======================================================
   2.5) CORE: Simulation Engine (from your file)
   ======================================================= */
export function simulatePlasmaConfinement(geometry:any, materialProps:any, inputPower:number) {
  const magneticField = inputPower / (materialProps.permeability * materialProps.area);
  const temperature = inputPower / materialProps.heatCapacity;
  return {
    magneticField: { intensity: magneticField, configuration: geometry },
    temperatureMap: { average: temperature, distribution: simulateTemperatureGradient(temperature) },
    confinementTime: Math.sqrt(materialProps.density / inputPower)
  };
}
export function calculateEnergyYield(plasmaState:any) {
  const efficiency = 0.35;
  const yieldMW = plasmaState.temperatureMap.average * plasmaState.confinementTime * efficiency;
  return { predictedYieldMW: yieldMW.toFixed(2), efficiency, notes: "Yield is based on simplified thermal + magnetic confinement assumptions." };
}
function simulateTemperatureGradient(coreTemp:number) {
  return Array.from({ length: 10 }, (_, i) => ({ region: `Zone-${i + 1}`, temp: coreTemp * (1 - i * 0.05) }));
}

/* =======================================================
   2.6) DATA: materialDB.js (integrated)
   ======================================================= */
const MATERIALS = {
  lithium: { heatCapacity: 3600, permeability: 1.26e-6, density: 530, area: 1.2 },
  tungsten: { heatCapacity: 134, permeability: 1.1e-6, density: 19250, area: 0.9 }
};
async function fetchMaterialProperties(material: "lithium" | "tungsten") {
  return MATERIALS[material] || MATERIALS["lithium"];
}

/* =======================================================
   2.7) SERVICES: API CLIENT + AEROIQ SERVICE (integrated)
   ======================================================= */
async function fetchData(url: string, method: "GET" | "POST", body?: any) {
  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: method === "POST" ? JSON.stringify(body ?? {}) : undefined,
    credentials: "include"
  });
  if (!res.ok) {
    const text = await res.text().catch(()=> "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  return res.json();
}
const API_BASE_URL = "https://enginuity-production.up.railway.app";

export async function getWavefronts(mach: number, altitude_ft: number) {
  try { return await fetchData(`${API_BASE_URL}/wavefronts`, "POST", { mach, altitude_ft }); }
  catch (error) { console.error("Error fetching wavefronts:", error); return { error: "Failed to fetch wavefront data" }; }
}
export async function getOrbit(semiMajorAxis: number, eccentricity: number, inclination: number) {
  try { return await fetchData(`${API_BASE_URL}/orbit`, "POST", { semiMajorAxis, eccentricity, inclination }); }
  catch (error) { console.error("Error fetching orbital data:", error); return { error: "Failed to fetch orbital data" }; }
}
export async function getHohmannTransfer(initialRadius: number, targetRadius: number) {
  try { return await fetchData(`${API_BASE_URL}/hohmann-transfer`, "POST", { r1_km: initialRadius, r2_km: targetRadius }); }
  catch (error) { console.error("Error fetching Hohmann transfer data:", error); return { error: "Failed to fetch transfer data" }; }
}
export async function getCFDAnalysis(parameters: any) {
  try { return await fetchData(`${API_BASE_URL}/cfd-analysis`, "POST", parameters); }
  catch (error) { console.error("Error fetching CFD analysis:", error); return { error: "Failed to fetch CFD analysis" }; }
}
export async function getFlightEnvelope(aircraft_type: string, conditions: any) {
  try { return await fetchData(`${API_BASE_URL}/flight-envelope`, "POST", { aircraft_type, conditions }); }
  catch (error) { console.error("Error fetching flight envelope:", error); return { error: "Failed to fetch flight envelope data" }; }
}

/* =======================================================
   2.8) LOCAL FALLBACKS (from your module exports)
   ======================================================= */
const MU_EARTH = 398600.4418; // km^3/s^2
function computeOrbitLocal(semiMajorAxisKm:number, eccentricity:number, inclinationDeg:number = 0.0, numPoints:number = 360) {
  const theta = Array.from({ length: numPoints }, (_, i) => (i * (2 * Math.PI)) / numPoints);
  const r = theta.map(t => semiMajorAxisKm * (1 - eccentricity ** 2) / (1 + eccentricity * Math.cos(t)));
  const x = r.map((radius, i) => radius * Math.cos(theta[i]));
  const y = r.map((radius, i) => radius * Math.sin(theta[i]));
  const incRad = (Math.PI / 180) * inclinationDeg;
  const yInclined = y.map(v => v * Math.cos(incRad));
  return {
    x, y: yInclined,
    details: {
      semiMajorAxisKm, eccentricity, inclinationDeg,
      apoapsisKm: semiMajorAxisKm * (1 + eccentricity),
      periapsisKm: semiMajorAxisKm * (1 - eccentricity),
      orbitalPeriodMin: (2 * Math.PI * Math.sqrt(semiMajorAxisKm ** 3 / MU_EARTH)) / 60
    }
  };
}
function computeHohmannTransferLocal(r1Km:number, r2Km:number) {
  const v1 = Math.sqrt(MU_EARTH / r1Km);
  const v2 = Math.sqrt(MU_EARTH / r2Km);
  const vT1 = Math.sqrt((2 * MU_EARTH * r2Km) / (r1Km * (r1Km + r2Km)));
  const vT2 = Math.sqrt((2 * MU_EARTH * r1Km) / (r2Km * (r1Km + r2Km)));
  return {
    deltaV1KmS: vT1 - v1,
    deltaV2KmS: v2 - vT2,
    totalDeltaVKmS: Math.abs(vT1 - v1) + Math.abs(v2 - vT2),
    timeOfFlightMin: (Math.PI * Math.sqrt(((r1Km + r2Km) ** 3) / (8 * MU_EARTH))) / 60
  };
}

/* =======================================================
   3) UI ATOMS
   ======================================================= */
function TopBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="topbar">
      <a className="brand-inline" onClick={onBack} href="#!" aria-label="Dashboard">
        <div className="logo-sq">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white">
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
          </svg>
        </div>
        <span className="brand-name">ENGENUITY</span>
      </a>
      <button className="btn" onClick={onBack}>← Dashboard</button>
    </div>
  );
}

function Sidebar({ activeKey, onSelect }: { activeKey: string | null; onSelect: (k: string | null) => void }) {
  return (
    <aside className="sidebar">
      <div className="sb-head">
        <div className="sb-title">ENGENUITY</div>
        <div className="sb-sub">Engineering Intelligence Platform</div>
      </div>

      <div className="sb-section">Engineering Modules</div>
      <div className="mod">
        {MODULES.map(m => {
          const active = activeKey === m.key;
          return (
            <div
              key={m.key}
              className={cls("tile", active && "active")}
              onClick={() => onSelect(active ? null : m.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e)=>{ if(e.key==="Enter"||e.key===" "){ onSelect(active ? null : m.key);} }}
            >
              <div className="tile-top">
                <div className="tile-ico">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={m.iconPath}/>
                  </svg>
                </div>
                <div>
                  <div className="tile-name">{m.name}</div>
                  <div className="tile-cat">{m.category}</div>
                </div>
                <div style={{marginLeft:"auto", fontWeight:900}} className={statusClass(m.status)}>
                  {m.status === "operational" ? "●" : m.status === "maintenance" ? "◐" : "●"}
                </div>
              </div>
              <div className="tile-desc">{m.description}</div>
              <div>
                {m.tags.slice(0,3).map(t => <span key={t} className="tag">{t}</span>)}
                {m.tags.length>3 && <span className="tag">+{m.tags.length-3}</span>}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{marginTop:16}}>
        <div className="sb-section">Status</div>
        <div className="tile">
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <span className="dot" />
            <div style={{fontSize:12,color:"#c9d4ea"}}>All Systems Operational</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* =======================================================
   4) LOGIN, DASHBOARD, BILLING VIEW
   ======================================================= */
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState(""); const [pwd, setPwd] = useState("");
  const [otp, setOtp] = useState(""); const [showOtp, setShowOtp] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && pwd) { if (showOtp && otp.length < 6) return; onSuccess(); }
  };
  return (
    <div className="login-wrap">
      <div className="login-card">
        <div style={{display:"flex",alignItems:"center",gap:12, marginBottom:12}}>
          <div className="logo-sq">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
            </svg>
          </div>
          <div>
            <div style={{fontSize:22,fontWeight:900}}>ENGENUITY</div>
            <div style={{opacity:.8,fontSize:12}}>Secure Access</div>
          </div>
        </div>
        <form onSubmit={submit}>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <div>
              <label style={{fontSize:12,opacity:.9}}>Email</label>
              <input className="input" type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/>
            </div>
            <div>
              <label style={{fontSize:12,opacity:.9}}>Password</label>
              <input className="input" type="password" required value={pwd} onChange={e=>setPwd(e.target.value)} placeholder="••••••••"/>
              <div className="helper">Passwords are encrypted at rest. SSO available for enterprise.</div>
            </div>
            {showOtp && (
              <div>
                <label style={{fontSize:12,opacity:.9}}>One-Time Code</label>
                <input className="input" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={otp} onChange={e=>setOtp(e.target.value)} placeholder="6-digit code"/>
                <div className="helper">2FA via authenticator or SMS.</div>
              </div>
            )}
            <div className="input-row" style={{alignItems:"center"}}>
              <label style={{display:"flex",gap:8,alignItems:"center"}}>
                <input type="checkbox" checked={showOtp} onChange={e=>setShowOtp(e.target.checked)} />
                <span style={{fontSize:12}}>Require 2FA this session</span>
              </label>
              <div style={{marginLeft:"auto"}}>
                <button type="submit" className="btn">Login</button>
              </div>
            </div>
          </div>
        </form>
        <div className="helper" style={{marginTop:12}}>By logging in you agree to the Terms & Privacy. For SSO, configure OIDC/SAML in Admin.</div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="section">
      <div className="panel header-card">
        <div>
          <div style={{fontSize:24,fontWeight:900,color:"#fff"}}>Engineering Intelligence Suite</div>
          <div style={{opacity:.9,marginTop:6}}>Advanced computational tools for aerospace and engineering applications.</div>
        </div>
        <span className="pill"><span className="dot" /> Connected</span>
      </div>

      <div className="grid-3">
        <div className="card">
          <h3>System Status</h3>
          {MODULES.filter(m => m.key !== "billing").map(m => (
            <div className="kv" key={m.key}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span className={cls(statusClass(m.status))}>
                  {m.status === "operational" ? "●" : m.status === "maintenance" ? "◐" : "●"}
                </span>
                <b>{m.name}</b>
              </div>
              <div style={{opacity:.85}}>
                <span style={{marginRight:10}}>Uptime {m.uptime}</span>
                <span>Load {m.load}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h3>Compute Utilization</h3>
          {MODULES.slice(0,4).map((m) => {
            const pct = parseInt(m.load);
            if (Number.isNaN(pct)) return null;
            return (
              <div key={m.key} style={{marginBottom:10}}>
                <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                  <div><b>{m.name}</b></div><div style={{opacity:.85}}>{pct}%</div>
                </div>
                <div className="bar"><div style={{width:`${pct}%`}} /></div>
              </div>
            );
          })}
        </div>

        <div className="card">
          <h3>Recent Activity</h3>
          {SYSTEM_FEED.map(ev => (
            <div className="kv" key={ev.id}>
              <div>{ev.text}</div>
              <div style={{opacity:.7}}>{ev.ts}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Billing & Payments ---------------- */
type Tier = {
  id: string; label: string; audience: string; seatMonthlyUSD?: number; seatYearlyUSD?: number;
  platformAnnualUSD?: number; included: { gpuHours: number; sims: number; apiK: number; storageGB: number; seats: number };
  overage: { gpuPerHourUSD: number; simPerRunUSD: number; apiPer1kUSD: number; storagePerGBMoUSD: number };
  notes?: string[];
};
const PRICING: Tier[] = [
  { id:"pro", label:"Pro (General Engineering)", audience:"Individual engineers & small teams",
    seatMonthlyUSD:125, seatYearlyUSD:1500, included:{ gpuHours:50, sims:200, apiK:500, storageGB:200, seats:1 },
    overage:{ gpuPerHourUSD:3.0, simPerRunUSD:2.0, apiPer1kUSD:0.5, storagePerGBMoUSD:0.12 } },
  { id:"industrial", label:"Industrial / Manufacturing", audience:"Plant, process, & advanced manufacturing orgs",
    seatMonthlyUSD:199, seatYearlyUSD:2000, included:{ gpuHours:120, sims:600, apiK:1500, storageGB:1000, seats:5 },
    overage:{ gpuPerHourUSD:3.0, simPerRunUSD:1.5, apiPer1kUSD:0.45, storagePerGBMoUSD:0.10 } },
  { id:"electronics", label:"Electronics / EDA", audience:"PCB design, signal integrity, & verification teams",
    seatMonthlyUSD:299, seatYearlyUSD:3000, included:{ gpuHours:160, sims:800, apiK:2000, storageGB:1500, seats:10 },
    overage:{ gpuPerHourUSD:3.0, simPerRunUSD:1.2, apiPer1kUSD:0.40, storagePerGBMoUSD:0.09 } },
  { id:"aero_defense", label:"Aerospace & Defense", audience:"Flight, CFD, aero-thermal, mission analysis",
    platformAnnualUSD:30000, included:{ gpuHours:1500, sims:6000, apiK:25000, storageGB:10000, seats:25 },
    overage:{ gpuPerHourUSD:2.8, simPerRunUSD:1.0, apiPer1kUSD:0.35, storagePerGBMoUSD:0.08 } },
  { id:"energy_nuclear", label:"Energy & Nuclear", audience:"Fusion/fission, thermo-hydraulics, materials modeling",
    platformAnnualUSD:45000, included:{ gpuHours:2500, sims:9000, apiK:35000, storageGB:16000, seats:35 },
    overage:{ gpuPerHourUSD:2.6, simPerRunUSD:0.9, apiPer1kUSD:0.32, storagePerGBMoUSD:0.07 } },
  { id:"robotics", label:"Robotics & Autonomy", audience:"Digital twins, validation, perception",
    seatMonthlyUSD:249, seatYearlyUSD:2500, included:{ gpuHours:300, sims:1200, apiK:4000, storageGB:2000, seats:10 },
    overage:{ gpuPerHourUSD:2.9, simPerRunUSD:1.1, apiPer1kUSD:0.38, storagePerGBMoUSD:0.08 } },
];
function BillingPayments() {
  const [activeTier, setActiveTier] = useState<Tier>(PRICING[0]);
  const usage = { gpuHours: 132, sims: 540, apiK: 1750, storageGB: 860, seats: 6 };
  const pct = (v:number, cap:number) => Math.min(100, Math.round((v/cap)*100));
  return (
    <div className="section">
      <div className="panel header-card">
        <div><div style={{fontSize:22,fontWeight:900}}>Billing & Payments</div><div style={{opacity:.9}}>Manage plan, usage, payment method, and invoices.</div></div>
        <span className="pill"><span className="dot" /> Account in good standing</span>
      </div>
      <div className="panel">
        <h2>Plans (Industry-specific)</h2>
        <div className="grid-3">
          {PRICING.map(t => (
            <div key={t.id} className="card" style={{borderColor: activeTier.id===t.id ? "#3b82f6" : undefined}}>
              <h3>{t.label}</h3>
              <div style={{fontSize:12,opacity:.85, marginBottom:8}}>{t.audience}</div>
              {"platformAnnualUSD" in t && t.platformAnnualUSD
                ? <div className="num">${t.platformAnnualUSD.toLocaleString()}/yr</div>
                : <div className="num">${t.seatMonthlyUSD}/mo<div style={{fontSize:12,opacity:.8}}>or ${t.seatYearlyUSD}/yr per seat</div></div>}
              <div className="kv"><div>Included GPU hrs</div><b>{t.included.gpuHours.toLocaleString()}</b></div>
              <div className="kv"><div>Simulations/mo</div><b>{t.included.sims.toLocaleString()}</b></div>
              <div className="kv"><div>API (thousand)</div><b>{t.included.apiK.toLocaleString()}</b></div>
              <div className="kv"><div>Storage (GB)</div><b>{t.included.storageGB.toLocaleString()}</b></div>
              <div className="kv"><div>Seats</div><b>{t.included.seats.toLocaleString()}</b></div>
              <div style={{marginTop:8}}>
                <div className="tag">GPU ${t.overage.gpuPerHourUSD}/hr</div>
                <div className="tag">Sim ${t.overage.simPerRunUSD}/run</div>
                <div className="tag">API ${t.overage.apiPer1kUSD}/1k</div>
                <div className="tag">Storage ${t.overage.storagePerGBMoUSD}/GB-mo</div>
              </div>
              <div style={{marginTop:10}}><button className="btn" onClick={()=>setActiveTier(t)}>{activeTier.id===t.id ? "Current Plan" : "Select Plan"}</button></div>
            </div>
          ))}
        </div>
      </div>
      <div className="panel" style={{marginTop:12}}>
        <h2>Metered Usage</h2>
        <div className="grid-2">
          <div className="card">
            <h3>This Billing Period</h3>
            {[
              ["GPU Hours","gpuHours","gpuHours"],
              ["Simulations","sims","sims"],
              ["API Calls (×1k)","apiK","apiK"],
              ["Storage (GB)","storageGB","storageGB"],
            ].map(([label, key])=>{
              const current = (usage as any)[key as string];
              const cap = (activeTier.included as any)[key as string];
              return (
                <div key={String(key)} style={{marginBottom:10}}>
                  <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                    <div>{label}</div><div>{current}/{cap}</div>
                  </div>
                  <div className="bar"><div style={{width:`${pct(current, cap)}%`}} /></div>
                </div>
              );
            })}
          </div>
          <div className="card">
            <h3>Projected Overage (est.)</h3>
            {(() => {
              const overGpu = Math.max(0, usage.gpuHours - activeTier.included.gpuHours) * activeTier.overage.gpuPerHourUSD;
              const overSim = Math.max(0, usage.sims - activeTier.included.sims) * activeTier.overage.simPerRunUSD;
              const overApi = Math.max(0, usage.apiK - activeTier.included.apiK) * activeTier.overage.apiPer1kUSD;
              const overSto = Math.max(0, usage.storageGB - activeTier.included.storageGB) * activeTier.overage.storagePerGBMoUSD;
              const total = overGpu + overSim + overApi + overSto;
              return (
                <>
                  <div className="kv"><div>GPU Hours</div><b>${overGpu.toFixed(2)}</b></div>
                  <div className="kv"><div>Simulations</div><b>${overSim.toFixed(2)}</b></div>
                  <div className="kv"><div>API</div><b>${overApi.toFixed(2)}</b></div>
                  <div className="kv"><div>Storage</div><b>${overSto.toFixed(2)}</b></div>
                  <div className="kv"><div>Total (est.)</div><b>${total.toFixed(2)}</b></div>
                </>
              );
            })()}
          </div>
        </div>
      </div>
      <div className="grid-2" style={{marginTop:12}}>
        <div className="card">
          <h3>Payment Method</h3>
          <input className="input" placeholder="Cardholder name" style={{marginBottom:8}}/>
          <div className="input-row" style={{marginTop:2}}>
            <input className="input" placeholder="Card number"/>
            <input className="input" placeholder="MM/YY"/>
            <input className="input" placeholder="CVC"/>
          </div>
          <div className="input-row" style={{marginTop:10}}>
            <input className="input" placeholder="Billing ZIP/Postal"/>
            <input className="input" placeholder="Country"/>
          </div>
          <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
            <button className="btn">Save Payment Method</button>
          </div>
          <div className="helper">Cards are tokenized; PCI handled by gateway.</div>
        </div>
        <div className="card">
          <h3>Invoices</h3>
          <div className="kv"><div>INV-000231 (Aug 2025)</div><b>$2,430.00</b></div>
          <div className="kv"><div>INV-000230 (Jul 2025)</div><b>$2,118.50</b></div>
          <div className="kv"><div>INV-000229 (Jun 2025)</div><b>$1,980.75</b></div>
          <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
            <button className="btn">Download Statements</button>
          </div>
        </div>
      </div>
      <div className="panel" style={{marginTop:12}}>
        <h2>Billing Contacts</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Primary Contact</h3>
            <input className="input" placeholder="Name" style={{marginBottom:8}}/>
            <input className="input" placeholder="Email"/>
          </div>
          <div className="card">
            <h3>Notifications</h3>
            <label style={{display:"flex",gap:8,alignItems:"center"}}>
              <input type="checkbox" defaultChecked/> <span style={{fontSize:12}}>Send usage alerts at 80% / 100%</span>
            </label>
            <label style={{display:"flex",gap:8,alignItems:"center",marginTop:8}}>
              <input type="checkbox" defaultChecked/> <span style={{fontSize:12}}>Email new invoice PDFs</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- AeroIQ Screen ---------------- */
function AeroIQScreen() {
  // Wavefronts
  const [mach, setMach] = useState<number>(1.8);
  const [altFt, setAltFt] = useState<number>(45000);
  const [waveRes, setWaveRes] = useState<any>(null);
  const [waveBusy, setWaveBusy] = useState(false);
  const [waveErr, setWaveErr] = useState<string | null>(null);

  // Orbit
  const [sma, setSma] = useState<number>(7000);
  const [e, setE] = useState<number>(0.001);
  const [inc, setInc] = useState<number>(28.5);
  const [orbitRes, setOrbitRes] = useState<any>(null);
  const [orbitBusy, setOrbitBusy] = useState(false);
  const [orbitErr, setOrbitErr] = useState<string | null>(null);

  // Hohmann
  const [r1, setR1] = useState<number>(6678);
  const [r2, setR2] = useState<number>(42164);
  const [hohRes, setHohRes] = useState<any>(null);
  const [hohBusy, setHohBusy] = useState(false);
  const [hohErr, setHohErr] = useState<string | null>(null);

  // CFD
  const [cfdText, setCfdText] = useState<string>('{"mach":0.85,"re":5e6,"aoa_deg":2.0}');
  const [cfdRes, setCfdRes] = useState<any>(null);
  const [cfdBusy, setCfdBusy] = useState(false);
  const [cfdErr, setCfdErr] = useState<string | null>(null);

  // Flight Envelope
  const [acType, setAcType] = useState<string>("F-16");
  const [envText, setEnvText] = useState<string>('{"altitude_ft":30000,"temperature_c":-25}');
  const [envRes, setEnvRes] = useState<any>(null);
  const [envBusy, setEnvBusy] = useState(false);
  const [envErr, setEnvErr] = useState<string | null>(null);

  // Plasma Confinement
  const [material, setMaterial] = useState<"lithium"|"tungsten">("lithium");
  const [geometry, setGeometry] = useState<string>("Tokamak-Std");
  const [inputPower, setInputPower] = useState<number>(1_000_000);
  const [plasmaRes, setPlasmaRes] = useState<any>(null);
  const [energyRes, setEnergyRes] = useState<any>(null);

  const safeParse = (t:string) => { try { return JSON.parse(t); } catch { return null; } };

  return (
    <div className="section">
      <div className="panel header-card">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div className="logo-sq">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <div style={{fontSize:22,fontWeight:900}}>AeroIQ</div>
            <div style={{opacity:.9}}>Aerospace Systems</div>
          </div>
        </div>
        <span className="pill"><span className="dot" /> Connected</span>
      </div>

      {/* Plasma Confinement */}
      <div className="panel">
        <h2>Plasma Confinement (Materials)</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Inputs</h3>
            <div className="input-row">
              <label style={{flex:1}}>
                <div style={{fontSize:12,opacity:.9,marginBottom:6}}>Material</div>
                <select className="input" value={material} onChange={e=>setMaterial(e.target.value as any)}>
                  <option value="lithium">Lithium</option>
                  <option value="tungsten">Tungsten</option>
                </select>
              </label>
              <label style={{flex:1}}>
                <div style={{fontSize:12,opacity:.9,marginBottom:6}}>Geometry</div>
                <input className="input" value={geometry} onChange={e=>setGeometry(e.target.value)} />
              </label>
            </div>
            <div className="input-row" style={{marginTop:8}}>
              <label style={{flex:1}}>
                <div style={{fontSize:12,opacity:.9,marginBottom:6}}>Input Power</div>
                <input className="input" type="number" value={inputPower} onChange={e=>setInputPower(parseFloat(e.target.value))} />
              </label>
            </div>
            <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
              <button className="btn" onClick={async()=>{
                const props = await fetchMaterialProperties(material);
                const state = simulatePlasmaConfinement(geometry, props, inputPower);
                const energy = calculateEnergyYield(state);
                setPlasmaRes(state); setEnergyRes(energy);
              }}>Simulate</button>
            </div>
          </div>
          <div className="card">
            <h3>Results</h3>
            <pre style={{whiteSpace:"pre-wrap"}}>{plasmaRes ? JSON.stringify({ plasmaState:plasmaRes, energyYield:energyRes }, null, 2) : "—"}</pre>
          </div>
        </div>
      </div>

      {/* Wavefronts */}
      <div className="panel" style={{marginTop:12}}>
        <h2>Supersonic Wavefronts</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Inputs</h3>
            <div className="input-row"><input className="input" type="number" step="0.01" value={mach} onChange={e=>setMach(parseFloat(e.target.value))} placeholder="Mach"/></div>
            <div className="input-row" style={{marginTop:8}}><input className="input" type="number" value={altFt} onChange={e=>setAltFt(parseFloat(e.target.value))} placeholder="Altitude (ft)"/></div>
            <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}><button className="btn" onClick={async()=>{
              setWaveBusy(true); setWaveErr(null);
              const res = await getWavefronts(mach, altFt);
              if ((res as any)?.error) setWaveErr((res as any).error);
              setWaveRes(res); setWaveBusy(false);
            }}>{waveBusy?"Computing…":"Compute Wavefronts"}</button></div>
          </div>
          <div className="card">
            <h3>Result</h3>
            <pre style={{whiteSpace:"pre-wrap"}}>{waveErr ? `Error: ${waveErr}` : (waveRes ? JSON.stringify(waveRes, null, 2) : "—")}</pre>
          </div>
        </div>
      </div>

      {/* Orbit & Hohmann */}
      <div className="grid-2" style={{marginTop:12}}>
        <div className="card">
          <h3>Orbital Elements → Ephemeris</h3>
          <div className="input-row">
            <input className="input" type="number" value={sma} onChange={e=>setSma(parseFloat(e.target.value))} placeholder="Semi-major axis (km)"/>
            <input className="input" type="number" step="0.0001" value={e} onChange={e=>setE(parseFloat(e.target.value))} placeholder="Eccentricity"/>
          </div>
          <div className="input-row" style={{marginTop:8}}>
            <input className="input" type="number" step="0.01" value={inc} onChange={e=>setInc(parseFloat(e.target.value))} placeholder="Inclination (deg)"/>
          </div>
          <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
            <button className="btn" onClick={async()=>{
              setOrbitBusy(true); setOrbitErr(null);
              const res = await getOrbit(sma, e, inc);
              if ((res as any)?.error) {
                setOrbitErr((res as any).error);
                setOrbitRes(computeOrbitLocal(sma, e, inc));
              } else {
                setOrbitRes(res);
              }
              setOrbitBusy(false);
            }}>
              {orbitBusy?"Computing…":"Compute Orbit"}
            </button>
          </div>
          <pre style={{whiteSpace:"pre-wrap", marginTop:10}}>{orbitErr ? `API Error: ${orbitErr}\n\nFallback:\n${JSON.stringify(orbitRes, null, 2)}` : (orbitRes ? JSON.stringify(orbitRes, null, 2) : "—")}</pre>
        </div>

        <div className="card">
          <h3>Hohmann Transfer</h3>
          <div className="input-row">
            <input className="input" type="number" value={r1} onChange={e=>setR1(parseFloat(e.target.value))} placeholder="Initial radius r1 (km)"/>
            <input className="input" type="number" value={r2} onChange={e=>setR2(parseFloat(e.target.value))} placeholder="Target radius r2 (km)"/>
          </div>
          <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
            <button className="btn" onClick={async()=>{
              setHohBusy(true); setHohErr(null);
              const res = await getHohmannTransfer(r1, r2);
              if ((res as any)?.error) {
                setHohErr((res as any).error);
                setHohRes(computeHohmannTransferLocal(r1, r2));
              } else {
                setHohRes(res);
              }
              setHohBusy(false);
            }}>
              {hohBusy?"Computing…":"Compute Transfer"}
            </button>
          </div>
          <pre style={{whiteSpace:"pre-wrap", marginTop:10}}>{hohErr ? `API Error: ${hohErr}\n\nFallback:\n${JSON.stringify(hohRes, null, 2)}` : (hohRes ? JSON.stringify(hohRes, null, 2) : "—")}</pre>
        </div>
      </div>

      {/* CFD */}
      <div className="panel" style={{marginTop:12}}>
        <h2>CFD Analysis</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Parameters (JSON)</h3>
            <textarea className="input" rows={6} value={cfdText} onChange={e=>setCfdText(e.target.value)}/>
            <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
              <button className="btn" onClick={async()=>{
                const params = safeParse(cfdText);
                if (!params) { alert("Invalid JSON"); return; }
                setCfdBusy(true); setCfdErr(null);
                const res = await getCFDAnalysis(params);
                if ((res as any)?.error) setCfdErr((res as any).error);
                setCfdRes(res); setCfdBusy(false);
              }}>{cfdBusy?"Running…":"Run CFD"}</button>
            </div>
          </div>
          <div className="card">
            <h3>Result</h3>
            <pre style={{whiteSpace:"pre-wrap"}}>{cfdErr ? `Error: ${cfdErr}` : (cfdRes ? JSON.stringify(cfdRes, null, 2) : "—")}</pre>
          </div>
        </div>
      </div>

      {/* Flight Envelope */}
      <div className="panel" style={{marginTop:12}}>
        <h2>Flight Envelope</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Inputs</h3>
            <div className="input-row"><input className="input" value={acType} onChange={e=>setAcType(e.target.value)} placeholder="Aircraft type"/></div>
            <div style={{marginTop:8}}>
              <textarea className="input" rows={5} value={envText} onChange={e=>setEnvText(e.target.value)} />
            </div>
            <div style={{marginTop:10,display:"flex",justifyContent:"flex-end"}}>
              <button className="btn" onClick={async()=>{
                const cond = safeParse(envText);
                if (!cond) { alert("Invalid JSON"); return; }
                setEnvBusy(true); setEnvErr(null);
                const res = await getFlightEnvelope(acType, cond);
                if ((res as any)?.error) setEnvErr((res as any).error);
                setEnvRes(res); setEnvBusy(false);
              }}>{envBusy?"Fetching…":"Get Envelope"}</button>
            </div>
          </div>
          <div className="card">
            <h3>Result</h3>
            <pre style={{whiteSpace:"pre-wrap"}}>{envErr ? `Error: ${envErr}` : (envRes ? JSON.stringify(envRes, null, 2) : "—")}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- CircuitIQ Screen (integrated) ---------------- */
function CircuitIQScreen() {
  const [simulationMode, setSimulationMode] =
    useState<'dc'|'ac'|'transient'|'frequency'>('dc');
  const [isSimulating, setIsSimulating] = useState(false);
  const [circuitPower, setCircuitPower] = useState(false);

  const [supplyV, setSupplyV] = useState(5);
  const [freqHz, setFreqHz] = useState(1000);
  const [tempC, setTempC] = useState(25);

  const modes = [
    { id: 'dc', name: 'DC Analysis', icon: '⚡' },
    { id: 'ac', name: 'AC Analysis', icon: '〰️' },
    { id: 'transient', name: 'Transient', icon: '📈' },
    { id: 'frequency', name: 'Frequency', icon: '🌊' },
  ] as const;

  const runSimulation = () => {
    if (!circuitPower) return;
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  const fmtFreq = (hz:number) => hz >= 1_000_000 ? `${(hz/1_000_000).toFixed(2)} MHz`
                         : hz >= 1_000 ? `${(hz/1_000).toFixed(2)} kHz`
                         : `${hz} Hz`;

  return (
    <div className="section">
      <div className="panel header-card">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div className="logo-sq">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <div>
            <div style={{fontSize:22,fontWeight:900}}>CircuitIQ</div>
            <div style={{opacity:.9}}>Electronic Circuit Design & Semiconductor Analysis</div>
          </div>
        </div>
        <span className="pill"><span className="dot" /> {circuitPower ? "Powered" : "Off"}</span>
      </div>

      <div className="panel">
        <h2>Simulation Modes</h2>
        <div style={{display:"flex",flexWrap:"wrap",gap:8, marginTop:6}}>
          {modes.map(m => (
            <button
              key={m.id}
              className="btn"
              style={{
                borderColor: simulationMode===m.id ? "#3b82f6" : undefined,
                background: simulationMode===m.id ? "#0f1a30" : undefined
              }}
              onClick={()=>setSimulationMode(m.id)}
            >
              <span style={{marginRight:8}}>{m.icon}</span>{m.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid-3" style={{marginTop:12}}>
        {/* Circuit controls */}
        <div className="card">
          <h3>Circuit Control</h3>

          <div style={{textAlign:"center", margin:"8px 0 14px"}}>
            <button
              onClick={()=>setCircuitPower(p=>!p)}
              aria-label="Toggle power"
              style={{
                width:80,height:80,borderRadius:999,border:"2px solid",
                borderColor: circuitPower ? "#22c55e" : "#64748b",
                background: circuitPower ? "rgba(34,197,94,.15)" : "rgba(100,116,139,.15)",
                fontSize:32, cursor:"pointer"
              }}
            >
              {circuitPower ? "🔋" : "⭕"}
            </button>
            <div style={{marginTop:6, fontWeight:800}}>{circuitPower ? "Powered" : "Off"}</div>
          </div>

          <div style={{display:"grid",gap:10}}>
            <div>
              <div style={{fontSize:12,opacity:.9,marginBottom:6}}>Supply Voltage (V)</div>
              <input type="range" min={1} max={24} value={supplyV} onChange={e=>setSupplyV(parseInt(e.target.value))} style={{width:"100%"}}/>
              <div style={{color:"#22c55e",fontSize:12,marginTop:4}}>{supplyV.toFixed(1)} V</div>
            </div>

            <div>
              <div style={{fontSize:12,opacity:.9,marginBottom:6}}>Frequency (Hz)</div>
              <input type="range" min={1} max={1_000_000} value={freqHz} onChange={e=>setFreqHz(parseInt(e.target.value))} style={{width:"100%"}}/>
              <div style={{color:"#22c55e",fontSize:12,marginTop:4}}>{fmtFreq(freqHz)}</div>
            </div>

            <div>
              <div style={{fontSize:12,opacity:.9,marginBottom:6}}>Temperature (°C)</div>
              <input type="range" min={-40} max={125} value={tempC} onChange={e=>setTempC(parseInt(e.target.value))} style={{width:"100%"}}/>
              <div style={{color:"#22c55e",fontSize:12,marginTop:4}}>{tempC}°C</div>
            </div>

            <button className="btn" onClick={runSimulation} disabled={isSimulating || !circuitPower}>
              {isSimulating ? "Simulating..." : "Run Analysis"}
            </button>
            {!circuitPower && <div className="helper">Turn power on to run analysis.</div>}
          </div>

          {/* Component Library */}
          <div className="panel" style={{marginTop:12}}>
            <h2>Components</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:8}}>
              {[
                ["🔌","Resistor"],["🔋","Capacitor"],["🧲","Inductor"],
                ["🔺","Diode"],["🔲","Transistor"],["🎛️","Op-Amp"]
              ].map(([icon,label])=>(
                <button key={label} className="btn" style={{display:"flex",gap:8,alignItems:"center",justifyContent:"center"}}>
                  <span style={{fontSize:20}}>{icon}</span><span style={{fontSize:12}}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Schematic / canvas */}
        <div className="card">
          <h3>Circuit Schematic</h3>
          <div style={{
            height:500,border:"1px solid var(--line)",borderRadius:12,
            background:"linear-gradient(135deg, rgba(16,185,129,.12), rgba(20,184,166,.12))",
            display:"flex",alignItems:"center",justifyContent:"center",position:"relative"
          }}>
            {isSimulating ? (
              <div style={{textAlign:"center"}}>
                <div style={{
                  width:48,height:48,borderRadius:999,border:"3px solid rgba(59,130,246,.25)",
                  borderTopColor:"#3b82f6", margin:"0 auto 12px auto",
                  animation:"spin .9s linear infinite"
                }}/>
                <div>Running Circuit Analysis…</div>
                <div style={{display:"flex",justifyContent:"center",gap:6,marginTop:8}}>
                  <span className="dot" />
                  <span className="dot" style={{animationDelay:".2s"}} />
                  <span className="dot" style={{animationDelay:".4s"}} />
                </div>
              </div>
            ) : (
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:56, marginBottom:8}}>🔬</div>
                <div style={{opacity:.9}}>Circuit Design Canvas</div>
                <div style={{opacity:.6, fontSize:12, marginTop:4}}>Drag components to build your circuit</div>
              </div>
            )}
          </div>
          <div style={{display:"flex",gap:8,marginTop:10}}>
            <button className="btn">Schematic</button>
            <button className="btn">PCB Layout</button>
            <button className="btn">3D View</button>
          </div>

          {/* Instruments */}
          <div className="grid-3" style={{marginTop:12}}>
            <div className="card">
              <h3>Oscilloscope</h3>
              <div style={{
                height:96, border:"1px solid var(--line)", borderRadius:10,
                background:"linear-gradient(90deg, rgba(16,185,129,.18), rgba(59,130,246,.18))",
                display:"flex",alignItems:"center",justifyContent:"center"
              }}>Waveform Display</div>
              <div style={{textAlign:"center",marginTop:6,color:"#22c55e",fontSize:12}}>CH1: {(supplyV/2).toFixed(2)} V</div>
            </div>
            <div className="card">
              <h3>Multimeter</h3>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:24,fontWeight:900,color:"#22c55e",marginBottom:6}}>
                  {(supplyV - 0.03*supplyV).toFixed(2)} V
                </div>
                <div style={{opacity:.7,fontSize:12}}>DC Voltage</div>
              </div>
            </div>
            <div className="card">
              <h3>Function Generator</h3>
              {[
                ["Waveform","Sine","#60a5fa"],
                ["Amplitude","5 V","#22c55e"],
                ["Frequency",fmtFreq(freqHz),"#a78bfa"]
              ].map(([k,v,color])=>(
                <div className="kv" key={k as string}><div>{k}</div><b style={{color:color as string}}>{v}</b></div>
              ))}
            </div>
          </div>
        </div>

        {/* Analysis results & design tools */}
        <div className="card">
          <h3>Analysis Results</h3>
          <div className="panel" style={{marginTop:6}}>
            <h2>DC Operating Point</h2>
            <div className="kv"><div>Node 1</div><b>{supplyV.toFixed(1)} V</b></div>
            <div className="kv"><div>Node 2</div><b>{(supplyV/2).toFixed(1)} V</b></div>
            <div className="kv"><div>Current</div><b>10 mA</b></div>
          </div>

          <div className="panel" style={{marginTop:10}}>
            <h2>Power Analysis</h2>
            <div className="kv"><div>Total Power</div><b style={{color:"#ef4444"}}>25 mW</b></div>
            <div className="kv"><div>Efficiency</div><b style={{color:"#22c55e"}}>85%</b></div>
          </div>

          <div className="panel" style={{marginTop:10}}>
            <h2>Frequency Response</h2>
            <div className="kv"><div>Bandwidth</div><b style={{color:"#a855f7"}}>10 kHz</b></div>
            <div className="kv"><div>Gain</div><b style={{color:"#60a5fa"}}>20 dB</b></div>
            <div className="kv"><div>Phase</div><b style={{color:"#22d3ee"}}>-45°</b></div>
          </div>

          <div className="panel" style={{marginTop:10}}>
            <h2>Design Tools</h2>
            <div style={{display:"grid",gap:8}}>
              <button className="btn">Auto Route</button>
              <button className="btn">DRC Check</button>
              <button className="btn">Generate Netlist</button>
              <button className="btn">Export Gerber</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

/* =======================================================
   5) APP (STATEFUL ONE-PAGER)
   ======================================================= */
export default function App() {
  useEffect(() => injectStyles(), []);

  const [isAuthed, setIsAuthed] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const activeMod = useMemo(() => MODULES.find(m => m.key === activeKey) || null, [activeKey]);

  if (!isAuthed) return <LoginScreen onSuccess={() => setIsAuthed(true)} />;

  return (
    <div className="app">
      <Sidebar activeKey={activeKey} onSelect={setActiveKey} />
      <TopBar onBack={() => setActiveKey(null)} />
      <main className="main">
        {activeMod
          ? activeMod.key === "billing"
            ? <BillingPayments />
            : activeMod.key === "aeroiq"
              ? <AeroIQScreen />
              : activeMod.key === "circuitiq"
                ? <CircuitIQScreen />
                : <ModuleDetail mod={activeMod} />
          : <Dashboard />
        }
      </main>
    </div>
  );
}

/* =======================================================
   6) GENERIC MODULE DETAIL
   ======================================================= */
function ModuleDetail({ mod }: { mod: ModuleDef }) {
  const perf = useMemo(() => {
    const base = mod.key.charCodeAt(0) % 20;
    return { jobs: 120 + base * 3, successes: 98 - (base % 6), failures: 2 + (base % 2), gpuHours: 340 + base * 5 };
  }, [mod]);
  const loadPct = parseInt(mod.load);
  return (
    <div className="section">
      <div className="panel header-card">
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div className="logo-sq">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d={mod.iconPath}/>
            </svg>
          </div>
          <div>
            <div style={{fontSize:22,fontWeight:900}}>{mod.name}</div>
            <div style={{opacity:.9}}>{mod.category}</div>
          </div>
        </div>
        <span className="pill">
          <span className={cls("dot")} />
          <span className={statusClass(mod.status)} style={{marginLeft:-4}}>
            {mod.status === "operational" ? "Operational" : mod.status === "maintenance" ? "Maintenance" : "Degraded"}
          </span>
        </span>
      </div>

      <div className="panel">
        <h2>Overview</h2>
        <div style={{color:"#c3cde0", marginBottom:8}}>{mod.description}</div>
        <div>{mod.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
      </div>

      <div className="grid-3" style={{marginTop:12}}>
        <div className="card">
          <h3>Uptime</h3>
          <div className="num">{mod.uptime}</div>
          <div style={{marginTop:10}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <div>Current Load</div><div style={{opacity:.85}}>{Number.isNaN(loadPct) ? "—" : `${loadPct}%`}</div>
            </div>
            {!Number.isNaN(loadPct) && <div className="bar"><div style={{width:`${loadPct}%`}} /></div>}
          </div>
        </div>
        <div className="card">
          <h3>Throughput (last 24h)</h3>
          <div className="kv"><div>Jobs Executed</div><b>{perf.jobs.toLocaleString()}</b></div>
          <div className="kv"><div>Success Rate</div><b>{perf.successes}%</b></div>
          <div className="kv"><div>Failures</div><b>{perf.failures}</b></div>
        </div>
        <div className="card">
          <h3>Resources</h3>
          <div className="kv"><div>GPU Hours</div><b>{perf.gpuHours}</b></div>
          <div className="kv"><div>Version</div><b>{mod.version}</b></div>
          <div className="kv"><div>SLA Tier</div><b>{mod.status==="operational"?"Gold":"Silver"}</b></div>
        </div>
      </div>

      <div className="panel" style={{marginTop:12}}>
        <h2>Operations</h2>
        <div className="grid-2">
          <div className="card">
            <h3>Pipelines</h3>
            <div className="kv"><div>Active Pipelines</div><b>{(mod.key.charCodeAt(1)%5)+3}</b></div>
            <div className="kv"><div>Queued Jobs</div><b>{(mod.key.charCodeAt(2)%20)+10}</b></div>
            <div className="kv"><div>Avg. Duration</div><b>{10 + (mod.key.charCodeAt(3)%7)} min</b></div>
          </div>
          <div className="card">
            <h3>Quality</h3>
            <div className="kv"><div>Validation Pass</div><b>{96 - (mod.key.charCodeAt(0)%5)}%</b></div>
            <div className="kv"><div>Drift Alerts</div><b>{(mod.key.charCodeAt(4)%3)}</b></div>
            <div className="kv"><div>Incidents (7d)</div><b>{(mod.key.charCodeAt(5)%2)}</b></div>
          </div>
        </div>
      </div>
    </div>
  );
}
