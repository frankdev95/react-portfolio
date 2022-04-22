import Particle from "./Particle";
import Vector from "./Vector";

export default class TextParticle extends Particle {
  constructor({
    x = 0,
    y = 0,
    tx = 0,
    ty = 0,
    size = Math.random() * 5 + 1,
    density = Math.random() * 30 + 1,
    speed = Math.random() * 5,
    direction = Math.random() * Math.PI * 2,
    accel = new Vector(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25),
    color = "white",
    strokeColor = "white",
  } = {}) {
    super({ x, y, size, density, speed, direction, accel, color, strokeColor });

    this.textXPos = tx;
    this.textYPos = ty;
  }

  get textXPos() {
    return this.tx;
  }

  set textXPos(tx) {
    this.tx = tx;
  }

  get textYPos() {
    return this.ty;
  }

  set textYPos(ty) {
    this.ty = ty;
  }
}
