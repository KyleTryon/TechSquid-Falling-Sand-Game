import { SParticle, SParticleProperties } from "../SParticle";
import { Water as WaterMaterial } from "../../materials/water.material";

export class Water extends SParticle {
  constructor(properties: SParticleProperties) {
    super(properties);
    this.sphysicsBody.material = WaterMaterial;
  }
}
