import { SPARTICLE_TYPE } from "../types/Particle.types";
import { SParticle, SParticleProperties } from "./SParticle";
import { Sand } from "./particles/Sand.particle";
import { Water } from "./particles/Water.particle";

export class SParticleFactory {
  public static createParticle(properties: SParticleProperties): SParticle {
    switch (properties.type) {
      case SPARTICLE_TYPE.SAND:
        return new Sand(properties);
      case SPARTICLE_TYPE.WATER:
        return new Water(properties);
      default:
        return new Sand(properties);
    }
  }
}
