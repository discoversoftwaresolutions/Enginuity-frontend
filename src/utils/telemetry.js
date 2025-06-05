// utils/telemetry.js

export function logEvent(component, message, payload = {}) {
  console.log(`[📡 FusionX][${component}] ${message}`, payload);
}

export function reportAnomaly(message, error) {
  console.error(`[⚠️ Anomaly] ${message}:`, error);
  // Extend to GCS log bucket or Railway logger if needed
}
