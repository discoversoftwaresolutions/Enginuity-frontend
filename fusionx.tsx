// fusionx.js
import { simulatePlasmaConfinement, calculateEnergyYield } from './core/simulationEngine';
import { visualizeMagneticField, renderPlasmaTorus } from './ui/visualization';
import { fetchMaterialProperties } from './data/materialDB';
import { logEvent, reportAnomaly } from './utils/telemetry';

const FusionX = {
  systemName: "FusionX - Plasma & Energy Engineering Suite",

  async runSimulation(config) {
    try {
      logEvent("FusionX", "Simulation started", config);

      const materialProps = await fetchMaterialProperties(config.material);
      const plasmaState = simulatePlasmaConfinement(config.geometry, materialProps, config.inputPower);
      const yieldReport = calculateEnergyYield(plasmaState);

      this.visualize(plasmaState);

      return {
        status: "success",
        plasmaState,
        yieldReport
      };
    } catch (error) {
      reportAnomaly("Simulation error", error);
      return {
        status: "error",
        message: error.message
      };
    }
  },

  visualize(plasmaState) {
    visualizeMagneticField(plasmaState.magneticField);
    renderPlasmaTorus(plasmaState.temperatureMap);
  },

  async diagnostics(config) {
    const stabilityScore = config.betaRatio / config.safetyFactor;
    const warnings = [];

    if (stabilityScore < 0.5) {
      warnings.push("⚠️ Plasma stability is low. Adjust magnetic field strength.");
    }

    if (config.neutronFlux > 1e14) {
      warnings.push("⚠️ Excessive neutron flux detected. Material degradation risk.");
    }

    return {
      stabilityScore,
      recommendations: warnings
    };
  }
};

export default FusionX;
