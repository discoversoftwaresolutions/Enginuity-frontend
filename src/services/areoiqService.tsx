// src/services/aeroiqService.ts
import { fetchData } from "@/utils/apiClient";

/**
 * Prefer env override in .env / deployment:
 *   VITE_ENGINUITY_API_URL=https://enginuity-production.up.railway.app
 */
const API_BASE_URL =
  (import.meta.env.VITE_ENGINUITY_API_URL as string) ??
  "https://enginuity-production.up.railway.app";

const PATHS = {
  wavefronts: "wavefronts",
  orbit: "orbit",
  hohmann: "hohmann-transfer",
  cfd: "cfd-analysis",
  envelope: "flight-envelope",
} as const;

const join = (base: string, path: string) =>
  `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;

/** Supersonic boom wavefronts */
export async function getWavefronts(mach: number, altitude_ft: number) {
  try {
    return await fetchData(
      join(API_BASE_URL, PATHS.wavefronts),
      "POST",
      { mach, altitude_ft }
    );
  } catch (error) {
    console.error("Error fetching wavefronts:", error);
    return { error: "Failed to fetch wavefront data" };
  }
}

/** Orbital mechanics */
export async function getOrbit(
  semiMajorAxis: number,
  eccentricity: number,
  inclination: number
) {
  try {
    return await fetchData(
      join(API_BASE_URL, PATHS.orbit),
      "POST",
      { semiMajorAxis, eccentricity, inclination }
    );
  } catch (error) {
    console.error("Error fetching orbital data:", error);
    return { error: "Failed to fetch orbital data" };
  }
}

/** Hohmann transfer */
export async function getHohmannTransfer(
  initialRadius: number,
  targetRadius: number
) {
  try {
    return await fetchData(
      join(API_BASE_URL, PATHS.hohmann),
      "POST",
      { r1_km: initialRadius, r2_km: targetRadius }
    );
  } catch (error) {
    console.error("Error fetching Hohmann transfer data:", error);
    return { error: "Failed to fetch transfer data" };
  }
}

/** CFD analysis */
export async function getCFDAnalysis(parameters: Record<string, unknown>) {
  try {
    return await fetchData(
      join(API_BASE_URL, PATHS.cfd),
      "POST",
      parameters
    );
  } catch (error) {
    console.error("Error fetching CFD analysis:", error);
    return { error: "Failed to fetch CFD analysis" };
  }
}

/** Flight envelope */
export async function getFlightEnvelope(
  aircraft_type: string,
  conditions: Record<string, unknown>
) {
  try {
    return await fetchData(
      join(API_BASE_URL, PATHS.envelope),
      "POST",
      { aircraft_type, conditions }
    );
  } catch (error) {
    console.error("Error fetching flight envelope:", error);
    return { error: "Failed to fetch flight envelope data" };
  }
}

/** Optional: convenience grouped export */
export default {
  getWavefronts,
  getOrbit,
  getHohmannTransfer,
  getCFDAnalysis,
  getFlightEnvelope,
};
