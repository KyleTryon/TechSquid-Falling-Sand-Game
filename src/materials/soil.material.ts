import { Material } from "../types/Material.types";

export const Soil: Material = {
  thermalConductivity: 0.3,
  specificHeat: 800,
  emmisivity: 0.95,
  density: 2700,
  color: 0x383223,
};

export const SoilWet: Material = {
  thermalConductivity: 0.4,
  specificHeat: 1480,
  emmisivity: 0.98,
  density: 2700,
  color: 0x1c1912,
};
