import { SParticle } from "../gameObjects/SParticle";
import { Vector2 } from "../utils/Math";

export interface SPhysicsManagerOptions {
  gravity: number;
  roomTemperature: number;
  temperature: number;
  roomBounds: Vector2;
}

export class SPhysicsManager {
  gravity: number;
  roomTemperature: number;
  temperature: number;
  private _roomBounds: Vector2;

  constructor(
    SPhysicsManagerOptions: SPhysicsManagerOptions = {
      gravity: 1,
      roomTemperature: 23,
      temperature: 23,
      roomBounds: new Vector2(0, 0),
    }
  ) {
    this.gravity = SPhysicsManagerOptions.gravity * 9.8;
    this.roomTemperature = SPhysicsManagerOptions.roomTemperature;
    this.temperature = SPhysicsManagerOptions.temperature;
    this._roomBounds = SPhysicsManagerOptions.roomBounds;
  }

  //calculate the next position of the particle
  update(particles: SParticle[], delta: number): void {
    // Update the physics of each particle
    delta = delta/100
    particles.forEach((particle) => {
      let nextPosition: Vector2 = new Vector2(particle.position.x, particle.position.y);
      if (particle.sphysicsBody.isStatic || !particle.sphysicsBody.isAtRest) {
        particle.addForce(new Vector2(0, this.gravity * delta));
        nextPosition = new Vector2(
          particle.sphysicsBody.position.x,
          particle.sphysicsBody.position.y
        ).add(particle.sphysicsBody.velocity.multiply(delta));
        //this._checkCollision(particle);
      }
      //Finally, set the position of the particle for the next frame
      particle.sphysicsBody.position = nextPosition;
      particle.position.set(nextPosition.x, nextPosition.y);
    });
  }

  // Check if a collision will occur when attempting to move to the next position
  _checkCollision(particle: SParticle): void {
    const nextPosition = particle.sphysicsBody.position;
    // Check if the next position is within the room bounds and limit the next position to the room bounds
    if (nextPosition.x < this._roomBounds.x) {
      nextPosition.x = this._roomBounds.x;
    }
    if (nextPosition.x > this._roomBounds.x + this._roomBounds.x) {
      nextPosition.x = this._roomBounds.x + this._roomBounds.x;
    }
    if (nextPosition.y < this._roomBounds.y) {
      nextPosition.y = this._roomBounds.y;
    }
    if (nextPosition.y > this._roomBounds.y + this._roomBounds.y) {
      nextPosition.y = this._roomBounds.y + this._roomBounds.y;
    }
    particle.position = nextPosition;
  }
}
