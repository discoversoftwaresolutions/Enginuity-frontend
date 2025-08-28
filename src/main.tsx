import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.getElementById("root");
if (!container) throw new Error("Root element #root not found");
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter /* basename={import.meta.env.BASE_URL} */>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
