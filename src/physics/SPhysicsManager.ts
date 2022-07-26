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

  constructor(SPhysicsManagerOptions: SPhysicsManagerOptions) {
    this.gravity = (SPhysicsManagerOptions.gravity || 12) * 9.8;
    this.roomTemperature = SPhysicsManagerOptions.roomTemperature || 23;
    this.temperature = SPhysicsManagerOptions.temperature || 23;
    this._roomBounds = SPhysicsManagerOptions.roomBounds || new Vector2(0, 0);
  }

  //calculate the next position of the particle
  update(particles: SParticle[], delta: number): void {
    // Update the physics of each particle
    delta = delta / 100;
    particles.forEach((particle, pindex) => {
      let nextPosition: Vector2 = new Vector2(
        particle.position.x,
        particle.position.y
      );
      if (particle.sphysicsBody.isStatic || !particle.sphysicsBody.isAtRest) {
        this._checkWalls(particle);
        const pcheck: SParticle[] = particles.filter((p, i) => {
          if (i !== pindex) {
            return p;
          }
          return;
        });
        const collidesWith = this._checkCollisions(particle, pcheck);
        this._checkSides(particle, collidesWith);

        if (!particle.sphysicsBody.isAtRest) {
          if (!particle.sphysicsBody.sides.down.isBlocked) {
            particle.addForce(new Vector2(0, this.gravity * delta));
          }
          if (
            particle.sphysicsBody.sides.down.isBlocked &&
            particle.sphysicsBody.sides.up.isBlocked
          ) {
            console.log("sliding")
            const pAposition = particle.sphysicsBody.position.x;
            const pBposition = particle.sphysicsBody.sides.down.particle!.sphysicsBody.position.x;
            let driftDir = 0
            if (pAposition > pBposition) {
              driftDir = 1;
            } else if (pAposition < pBposition) {
              driftDir = -1;
            } else {
              driftDir = Math.random() > 0.5 ? 1 : -1;
            }
            particle.sphysicsBody.velocity.y = 0;
            particle.addForce(new Vector2(driftDir * 4, 0));
          }
          nextPosition = new Vector2(
            particle.sphysicsBody.position.x,
            particle.sphysicsBody.position.y
          ).add(particle.sphysicsBody.velocity.multiply(delta));
        }
        particle.sphysicsBody.sides.down.isBlocked = false;
        particle.sphysicsBody.sides.left.isBlocked = false;
        particle.sphysicsBody.sides.right.isBlocked = false;
        particle.sphysicsBody.sides.up.isBlocked = false;
      }
      //Finally, set the position of the particle for the next frame
      particle.sphysicsBody.position = nextPosition;
      particle.position.set(nextPosition.x, nextPosition.y);
    });
  }

  //Check for collisions between particles
  _checkCollisions(particleA: SParticle, particles: SParticle[]): SParticle[] {
    const collidedWith: SParticle[] = [];
    particles.forEach((particleB) => {
      if (
        particleA.sphysicsBody.position.x + particleA.width / 2 >
          particleB.sphysicsBody.position.x - particleB.width / 2 &&
        particleA.sphysicsBody.position.x - particleA.width / 2 <
          particleB.sphysicsBody.position.x + particleB.width / 2 &&
        particleA.sphysicsBody.position.y + particleA.height / 2 >
          particleB.sphysicsBody.position.y - particleB.height / 2 &&
        particleA.sphysicsBody.position.y - particleA.height / 2 <
          particleB.sphysicsBody.position.y + particleB.height / 2
      ) {
        collidedWith.push(particleB);
      }
    });
    return collidedWith;
  }

  //Locate which sides of are blocked by collisions
  _checkSides(particleA: SParticle, collidedWith: SParticle[]): void {
    if (collidedWith.length > 0) {
      collidedWith.forEach((particleB) => {
        // Locate which sides of the particle are blocked by the collision
        // if right side
        if (
          particleB.sphysicsBody.position.x >
          particleA.sphysicsBody.position.x + particleA.width / 2
        ) {
          // right side
          particleA.sphysicsBody.sides.right = {
            isBlocked: true,
            particle: particleB,
          };
        } else if (
          particleB.sphysicsBody.position.x <
          particleA.sphysicsBody.position.x - particleA.width / 2
        ) {
          // left side
          particleA.sphysicsBody.sides.left = {
            isBlocked: true,
            particle: particleB,
          };
        } else if (
          particleB.sphysicsBody.position.y >
          particleA.sphysicsBody.position.y + particleA.height / 2
        ) {
          // bottom side
          particleA.sphysicsBody.sides.down = {
            isBlocked: true,
            particle: particleB,
          };
        } else if (
          particleB.sphysicsBody.position.y <
          particleA.sphysicsBody.position.y - particleA.height / 2
        ) {
          // top side
          particleA.sphysicsBody.sides.up = {
            isBlocked: true,
            particle: particleB,
          };
        }
      });
    }
  }

  // Check if a collision will occur when attempting to move to the next position
  _checkWalls(particle: SParticle): void {
    if (
      particle.sphysicsBody.position.y + particle.height / 2 >
      this._roomBounds.y - particle.height / 2
    ) {
      particle.sphysicsBody.isAtRest = true;
    }
  }
}
