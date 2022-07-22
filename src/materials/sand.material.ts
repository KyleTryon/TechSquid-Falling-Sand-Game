import { Material } from "../types/Material.types";

export const Sand: Material = {
  thermalConductivity: 0.25,
  specificHeat: 830,
  emmisivity: 0.95,
  density: 2700,
  color: 0xe3d3ac
}

export const SandWet: Material = {
  thermalConductivity: 0.4,
  specificHeat: 1480,
  emmisivity: 0.98,
  density: 2700,
  color: 0xbfb08c,
};