import { SParticle } from "../gameObjects/SParticle";
import { Material } from "../types/Material.types";
import { Vector2 } from "../utils/Math";

export interface SPhysicsBodyProperties {
  position: Vector2;
  velocity: Vector2;
  isStatic?: boolean;
  material: Material;
  temperature?: number;
  gravity?: Vector2;
}

export interface SBodySides {
  up: SBodySide;
  down: SBodySide;
  left: SBodySide;
  right: SBodySide;
}

export type SBodySide = {
    isBlocked: boolean;
    particle?: SParticle;
};

export class SPhysicsBody {
  allowCollision: boolean = true;
  allowGravity: boolean = true;
  blocked = { up: false, down: false, left: false, right: false };
  gravity: Vector2;
  isDestroyed: boolean = false
  isStatic: boolean = false;
  material: Material;
  position: Vector2;
  private static _maxVelocity = 1000;
  temperature: number = 23;
  velocity: Vector2;
  isAtRest: boolean = false;
  sides: SBodySides = {
    up: { isBlocked: false },
    down: { isBlocked: false },
    left: { isBlocked: false },
    right: { isBlocked: false }
  }

  constructor(SPhysicsBodyProperties: SPhysicsBodyProperties) {

    this.position = SPhysicsBodyProperties.position;
    this.velocity = SPhysicsBodyProperties.velocity;
    this.gravity = SPhysicsBodyProperties.gravity || new Vector2(0, 0);
    this.isStatic = SPhysicsBodyProperties.isStatic || false;
    this.material = SPhysicsBodyProperties.material;
    this.temperature = SPhysicsBodyProperties.temperature || 23;

  }

  addForce(force: Vector2) {
    this.velocity.add(force);
    if (this.velocity.magnatude() > SPhysicsBody._maxVelocity) {
      this.velocity.normalize();
      this.velocity.multiply(SPhysicsBody._maxVelocity);
    }
  }


}