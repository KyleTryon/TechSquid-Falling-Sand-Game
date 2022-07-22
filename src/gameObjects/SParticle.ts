import * as PIXI from "pixi.js";
import Stage from "../stages/main.stage";
import { SPARTICLE_TYPE } from "../types/Particle.types";
import { SPhysicsBody } from "../physics/SphysicsBody";
import { Vector2 } from "../utils/Math";
import { Material } from "../types/Material.types";
import { Sand as SandMaterial } from "../materials/sand.material";

export type SParticleProperties = {
  type?: SPARTICLE_TYPE;
  stage: Stage;
  size?: number;
  position: Vector2;
  material?: Material
};

export class SParticle extends PIXI.Graphics {
  type: SPARTICLE_TYPE;
  stage: Stage;
  size: number;
  sphysicsBody: SPhysicsBody;
  constructor(properties: SParticleProperties) {
    super();
    this.type = properties.type || SPARTICLE_TYPE.SAND;
    this.stage = properties.stage;
    this.size = properties.size || 1;
    this.sphysicsBody = new SPhysicsBody({
      position: new Vector2(properties.position.x, properties.position.y),
      velocity: new Vector2(0, 0),
      material: properties.material || SandMaterial,
    });
    this.scale.set(1, 1);
    this.position.set(properties.position.x, properties.position.y);
    this.draw();
  }

  draw() {
    this.beginFill(this.getColor);
    this.drawRect(
      0,
      0,
      this.size,
      this.size
    );
    this.endFill();
  }

  addForce(force: Vector2) {
    this.sphysicsBody.addForce(force);
  }

  get getColor() {
    return this.sphysicsBody.material.color;
  }

  get getPosition() {
    return this.sphysicsBody.position;
  }
}
