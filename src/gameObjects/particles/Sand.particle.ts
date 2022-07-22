import { SParticle, SParticleProperties } from "../SParticle";
import { Sand as SandMaterial } from "../../materials/sand.material";
import { SPARTICLE_TYPE } from "../../types/Particle.types";

export class Sand extends SParticle {
  constructor(properties: SParticleProperties) {
    super(properties);
    this.type = SPARTICLE_TYPE.SAND;
    this.sphysicsBody.material = SandMaterial;
  }
}