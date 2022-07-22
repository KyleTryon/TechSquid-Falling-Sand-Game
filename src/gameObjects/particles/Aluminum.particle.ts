import { SParticle, SParticleProperties } from "../SParticle";
import { Aluminum as AluminumMaterial } from "../../materials/aluminum.material";

export class Aluminum extends SParticle {
  constructor(properties: SParticleProperties) {
    super(properties);
    this.sphysicsBody.material = AluminumMaterial;
  }
}
