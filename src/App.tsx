import React, { useEffect, useMemo, useState } from "react";

/* =======================================================
   0) GLOBAL STYLE INJECTION (no Tailwind needed)
   ======================================================= */
function injectStyles() {
  if (document.getElementById("engenuity-inline-styles")) return;
  const style = document.createElement("style");
  style.id = "engenuity-inline-styles";
  style.textContent = `
:root{
  --bg1:#0b1220; --bg2:#0e1424; --panel:#0f172a; --panel-2:#111a2e;
  --line:#1f2a44; --muted:#a3b2c7; --text:#e6edf6; --title:#f1f5f9;
  --blue-500:#3b82f6; --blue-600:#2563eb; --blue-700:#1d4ed8;
  --green-500:#22c55e; --yellow-500:#eab308; --red-500:#ef4444;
  --slate-600:#475569; --slate-700:#334155; --slate-800:#1f2937; --slate-900:#0f172a;
  --shadow:0 14px 40px rgba(0,0,0,.35);
}
*{box-sizing:border-box}
html,body,#root{height:100%;margin:0}
body{background:linear-gradient(135deg,var(--bg1),var(--bg2));color:var(--text);font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Roboto,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;letter-spacing:.2px}

/* Shell */
.app{min-height:100%;display:grid;grid-template-columns:320px 1fr;grid-template-rows:64px 1fr;grid-template-areas:"sidebar header" "sidebar main"}

/* Top bar */
.topbar{grid-area:header;display:flex;align-items:center;justify-content:space-between;height:64px;padding:0 18px;border-bottom:1px solid var(--line);backdrop-filter:saturate(140%) blur(4px);background:linear-gradient(180deg,rgba(2,6,23,.7),rgba(2,6,23,.4))}
.brand-inline{display:flex;align-items:center;gap:12px;color:#fff;text-decoration:none}
.logo-sq{width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--blue-600),var(--blue-700));display:flex;align-items:center;justify-content:center;box-shadow:var(--shadow)}
.brand-name{font-weight:900;letter-spacing:.6px}
.btn{border:1px solid var(--line);background:#0b1324;color:#c9d4ea;border-radius:10px;padding:8px 12px;font-weight:700;cursor:pointer}
.btn:hover{background:#101a2a}

/* Sidebar */
.sidebar{grid-area:sidebar;grid-row:1 / span 2;min-height:100vh;background:linear-gradient(180deg,rgba(15,23,42,.95),rgba(15,23,42,.88));border-right:1px solid var(--line);padding:18px;position:sticky;top:0}
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
.tile-cat{font-size:12px;color:var(--muted)}
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

/* Header block inside main */
.header-card{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}

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
   1) TYPES & MOCKS
   ======================================================= */
type ModuleDef = {
  key: string;
  name: string;
  category: string;
  description: string;
  tags: string[];
  iconPath: string;
  // mock telemetry
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
   4) DASHBOARD & MODULE VIEWS
   ======================================================= */
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
          {MODULES.map(m => (
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
          {MODULES.slice(0,4).map((m, i) => {
            const pct = parseInt(m.load);
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

function ModuleDetail({ mod }: { mod: ModuleDef }) {
  const perf = useMemo(() => {
    // mock KPIs by module
    const base = mod.key.charCodeAt(0) % 20;
    return {
      jobs: 120 + base * 3,
      successes: 98 - (base % 6),
      failures: 2 + (base % 2),
      gpuHours: 340 + base * 5,
    };
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
              <div>Current Load</div><div style={{opacity:.85}}>{loadPct}%</div>
            </div>
            <div className="bar"><div style={{width:`${loadPct}%`}} /></div>
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

/* =======================================================
   5) APP (STATEFUL ONE-PAGER)
   ======================================================= */
export default function App() {
  useEffect(() => injectStyles(), []);

  const [activeKey, setActiveKey] = useState<string | null>(null);
  const activeMod = useMemo(() => MODULES.find(m => m.key === activeKey) || null, [activeKey]);

  return (
    <div className="app">
      <Sidebar activeKey={activeKey} onSelect={setActiveKey} />
      <TopBar onBack={() => setActiveKey(null)} />
      <main className="main">
        {activeMod ? <ModuleDetail mod={activeMod} /> : <Dashboard />}
      </main>
    </div>
  );
}
