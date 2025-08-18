// data/materialDB.js

const MATERIALS = {
  lithium: {
    heatCapacity: 3600,   // J/kg·K
    permeability: 1.26e-6, // H/m
    density: 530,         // kg/m³
    area: 1.2             // m² cross-section
  },
  tungsten: {
    heatCapacity: 134, 
    permeability: 1.1e-6,
    density: 19250,
    area: 0.9
  }
};

export async function fetchMaterialProperties(material) {
  return MATERIALS[material] || MATERIALS["lithium"];
}
