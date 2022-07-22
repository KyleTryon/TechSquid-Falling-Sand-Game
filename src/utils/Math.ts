export class Vector2 {
  x: number;
  y: number;
  constructor();
  constructor(x: number, y: number);
  constructor(x?: number, y?: number) {
    this.x = x || 0;
    this.y = y || 0;
  }

  clone(): Vector2 {
    return new Vector2(this.x, this.y);
  }

  add(vector: Vector2): Vector2 {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }

  multiply(scalar: number): Vector2 {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  magnatude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize(): Vector2 {
    let magnitude = this.magnatude();
    this.x /= magnitude;
    this.y /= magnitude;
    return this;
  }

  get getObject(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

}