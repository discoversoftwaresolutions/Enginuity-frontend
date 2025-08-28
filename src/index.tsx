// src/index.tsx  (or src/main.tsx — keep whichever your index.html loads)
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css"; // Tailwind/global styles if you use them

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");

createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
