import { screenGraphPlugin } from "@animaapp/vite-plugin-screen-graph";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  base: "/",
  publicDir: "./static",
  plugins: [
    react(),
    ...(mode === "development" ? [screenGraphPlugin()] : [])
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true
  }
}));
