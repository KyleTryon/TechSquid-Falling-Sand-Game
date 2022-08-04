import * as PIXI from "pixi.js";
import { SPARTICLE_TYPE } from "../types/Particle.types";
import { Vector2 } from "../utils/Math";
export class InputController {
  stage: PIXI.Container;
  imanager: PIXI.InteractionManager;
  renderer: PIXI.Renderer | PIXI.AbstractRenderer;
  isDragging: boolean = false;
  mousePosition: Vector2 = new Vector2();
  selectedParticle: SPARTICLE_TYPE = SPARTICLE_TYPE.SAND;

  constructor(
    renderer: PIXI.Renderer | PIXI.AbstractRenderer,
    stage: PIXI.Container
  ) {
    this.stage = stage;
    this.renderer = renderer;
    this.imanager = new PIXI.InteractionManager(this.renderer);
    this.imanager.autoPreventDefault = false;
    this.imanager.on("mousemove", (event) => this.onMouseMove(event));
    this.imanager.on("mousedown", (event) => this.onDragStart(event));
    this.imanager.on("mouseup", (event) => this.onDragEnd(event));
  }

  onDragStart(event: PIXI.InteractionEvent) {
    this.isDragging = true;
    const localPosition = event.data.getLocalPosition(event.target);
    this.mousePosition = new Vector2(localPosition.x, localPosition.y);
  }

  onDragEnd(event: PIXI.InteractionEvent) {
    this.isDragging = false;
  }

  onMouseMove(event: PIXI.InteractionEvent) {
    try {
      const globalPosition = event.data.getLocalPosition(event.target);
      if (this.imanager.hitTest(globalPosition, this.stage)) {
        const localPosition = event.data.getLocalPosition(event.target);
        this.mousePosition = new Vector2(localPosition.x, localPosition.y);
      }
    } catch {}
  }
}
