// core/simulationEngine.js

export function simulatePlasmaConfinement(geometry, materialProps, inputPower) {
  const magneticField = inputPower / (materialProps.permeability * materialProps.area);
  const temperature = inputPower / materialProps.heatCapacity;

  return {
    magneticField: {
      intensity: magneticField,
      configuration: geometry
    },
    temperatureMap: {
      average: temperature,
      distribution: simulateTemperatureGradient(temperature)
    },
    confinementTime: Math.sqrt(materialProps.density / inputPower)
  };
}

export function calculateEnergyYield(plasmaState) {
  const efficiency = 0.35;
  const yieldMW = plasmaState.temperatureMap.average * plasmaState.confinementTime * efficiency;

  return {
    predictedYieldMW: yieldMW.toFixed(2),
    efficiency,
    notes: "Yield is based on simplified thermal + magnetic confinement assumptions."
  };
}

function simulateTemperatureGradient(coreTemp) {
  return Array.from({ length: 10 }, (_, i) => ({
    region: `Zone-${i + 1}`,
    temp: coreTemp * (1 - i * 0.05)
  }));
}
