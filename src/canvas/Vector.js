export default class Vector {
  constructor(x = 1, y = 0) {
    this.x = x;
    this.y = y;
    this.baseX = this.x;
    this.baseY = this.y;
  }

  set angle(radians) {
    this.x = Math.cos(radians) * this.length;
    this.y = Math.sin(radians) * this.length;
  }

  get angle() {
    const radians = Math.atan2(this.y, this.x);
    const degrees = this.radiansToDegrees(radians);

    return {
      radians,
      degrees,
    };
  }

  set length(length) {
    let radians = this.angle.radians;

    this.x = Math.cos(radians) * length;
    this.y = Math.sin(radians) * length;
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  get x() {
    return this.xPos;
  }

  set x(x) {
    this.xPos = x;
  }

  get baseX() {
    return this.bX;
  }

  set baseX(bX) {
    this.bX = bX;
  }

  get y() {
    return this.yPos;
  }

  set y(y) {
    this.yPos = y;
  }

  get baseY() {
    return this.bY;
  }

  set baseY(bY) {
    this.bY = bY;
  }

  addTo(v2) {
    this.x = this.xPos + v2.xPos;
    this.y = this.yPos + v2.yPos;
  }

  radiansToDegrees(radians) {
    return radians * (180 / 3.14);
  }
}
