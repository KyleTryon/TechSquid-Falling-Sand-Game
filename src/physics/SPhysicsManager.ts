import { SParticle } from "../gameObjects/SParticle";
import { Vector2 } from "../utils/Math";

export interface SPhysicsManagerOptions {
  gravity?: number;
  roomTemperature?: number;
  temperature?: number;
  roomBounds?: Vector2;
}

export class SPhysicsManager {
  gravity: number;
  roomTemperature: number;
  temperature: number;
  private _roomBounds: Vector2;

  constructor(
    SPhysicsManagerOptions: SPhysicsManagerOptions
  ) {
    this.gravity = (SPhysicsManagerOptions.gravity || 12) * 9.8;
    this.roomTemperature = SPhysicsManagerOptions.roomTemperature || 23;
    this.temperature = SPhysicsManagerOptions.temperature  || 23;
    this._roomBounds = SPhysicsManagerOptions.roomBounds || new Vector2(0, 0);
  }

  //calculate the next position of the particle
  update(particles: SParticle[], delta: number): void {
    // Update the physics of each particle
    delta = delta/100
    particles.forEach((particle, pindex) => {
      let nextPosition: Vector2 = new Vector2(particle.position.x, particle.position.y);
      if (particle.sphysicsBody.isStatic || !particle.sphysicsBody.isAtRest) {
        this._checkWalls(particle);
        const pcheck: SParticle[] = particles.filter((p,i)=> {
          if (i !== pindex) {
            return p;
          } return
        })
        this.checkCollisions(particle, pcheck);
        
        if (!particle.sphysicsBody.isAtRest) {
          particle.addForce(new Vector2(0, this.gravity * delta));
          nextPosition = new Vector2(
            particle.sphysicsBody.position.x,
            particle.sphysicsBody.position.y
          ).add(particle.sphysicsBody.velocity.multiply(delta));
        }
      }
      //Finally, set the position of the particle for the next frame
      particle.sphysicsBody.position = nextPosition;
      particle.position.set(nextPosition.x, nextPosition.y);
    });
  }

  //Check for collisions between particles
  checkCollisions(particleA: SParticle, particles: SParticle[]): void {
    particles.forEach((particleB) => {
      if (particleA.sphysicsBody.position.x + (particleA.width / 2) > particleB.sphysicsBody.position.x - (particleB.width / 2) &&
        particleA.sphysicsBody.position.x - (particleA.width / 2) < particleB.sphysicsBody.position.x + (particleB.width / 2) &&
        particleA.sphysicsBody.position.y + (particleA.height / 2) > particleB.sphysicsBody.position.y - (particleB.height / 2) &&
        particleA.sphysicsBody.position.y - (particleA.height / 2) < particleB.sphysicsBody.position.y + (particleB.height / 2)) {
        particleA.sphysicsBody.isAtRest = true;
        particleB.sphysicsBody.isAtRest = true;
      }
    })
  }

  // Check if a collision will occur when attempting to move to the next position
  _checkWalls(particle: SParticle): void {
   if (particle.sphysicsBody.position.y + (particle.height / 2) > this._roomBounds.y - (particle.height / 2)) {
      particle.sphysicsBody.isAtRest = true;
    }

  }
}
