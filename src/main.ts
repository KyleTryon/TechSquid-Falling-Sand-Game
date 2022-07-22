import "./style.css";
import * as PIXI from "pixi.js";
import MainStage from "./stages/main.stage";

export class Game {
  appContainer = document.querySelector<HTMLDivElement>("#app")!;
  app = new PIXI.Application({
    width: 800,
    height: 800,
    antialias: true,
    backgroundColor: 0x000000,
    resolution: window.devicePixelRatio || 1,
  });
  private _lastTick: number = performance.now();
  private _tickRate: number = 1 / 60;

  constructor() {
    this.appContainer.appendChild(this.app.view);
    this.app.stage = new MainStage(
      this.app.renderer,
      800,
      800
    );
    this.update();
  }

  get tickRate() {
    return this._tickRate;
  }

  update() {
    const delta = performance.now() - this._lastTick;
    if (delta >= this.tickRate) {
      this._lastTick = performance.now();
      (this.app.stage as MainStage).update(delta);
      requestAnimationFrame(this.update.bind(this));
    }
  }
}

new Game();
