import * as PIXI from "pixi.js";
import { InputController } from "../gameController/inputController";
import { Vector2 } from "../utils/Math";
import { SParticle } from "../gameObjects/SParticle";
import { SParticleFactory } from "../gameObjects/SParticleFactory";
import { SPARTICLE_TYPE } from "../types/Particle.types";
import { SPhysicsManager } from "../physics/SPhysicsManager";
export default class Stage extends PIXI.Container {
  private _inputController: InputController
  readonly renderer: PIXI.Renderer | PIXI.AbstractRenderer;
  graphics: PIXI.Graphics;
  particles: SParticle[] = [];
  physics: SPhysicsManager
  worldTemperature: number = 23;
  private _frameCount: number = 0;
  private _lastDrawnParticleFrame: number = 0;

  constructor(
    renderer: PIXI.Renderer | PIXI.AbstractRenderer,
    width: number,
    height: number
  ) {
    super();
    this.renderer = renderer;
    this._inputController = new InputController(renderer, this);
    this.width = width;
    this.height = height;
    this.scale.set(1, 1);
    this.graphics = new PIXI.Graphics();
    this.hitArea = new PIXI.Rectangle(0, 0, width, height);
    this.interactive = true;
    this.physics = new SPhysicsManager({
      roomBounds: new Vector2(width, height),
    });
    const temppos = new Vector2(300, 10);
    const initparticle = SParticleFactory.createParticle({
      type: SPARTICLE_TYPE.SAND,
      stage: this,
      position: temppos,
    });
    this.particles.push(initparticle);
    this.update(0);
  }

  update(delta: number) {
    this._frameCount++;
    if (this._inputController.isDragging) {
      this._userDrawParticles();
    }
    this.physics.update(this.particles, delta);
    this.particles.forEach((particle) => {
      this.addChild(particle);
    }, this);
  }

  private _userDrawParticles() {
    const doDraw = (this._frameCount - this._lastDrawnParticleFrame) > 5;
    if (doDraw) {
      this._lastDrawnParticleFrame = this._frameCount;
      const newParticle = SParticleFactory.createParticle({
        type: this._inputController.selectedParticle,
        stage: this,
        position: new Vector2(
          this._inputController.mousePosition.x,
          this._inputController.mousePosition.y
        ),
      });
      this.particles.push(newParticle);
    }
  }
}
