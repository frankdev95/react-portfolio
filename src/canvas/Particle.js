import Vector from "./Vector";

export default class Particle {
  constructor({
    x = 0,
    y = 0,
    size = Math.random() * 5 + 1,
    density = Math.random() * 30 + 1,
    speed = Math.random() * 5,
    direction = Math.random() * Math.PI * 2,
    accel = new Vector(Math.random() * 0.5 - 0.25, Math.random() * 0.5 - 0.25),
    color = "white",
    strokeColor = "white",
  } = {}) {
    this.position = new Vector(x, y);
    this.velocity = new Vector();
    this.accel = accel;

    this.velocity.angle = direction;
    this.velocity.length = speed;

    this.initialSize = size;
    this.setSize(size);
    this.setDensity(density);
    this.sizeAngle = Math.PI;

    this.color = color;
    this.strokeColor = strokeColor;
  }

  addVelocity() {
    this.position.addTo(this.velocity);
  }

  repelWithinRadius(xPos, yPos, radius) {
    let { distance, dx, dy } = this.distToCoordinates(xPos, yPos);

    const forceDirectionX = dx / distance;
    const forceDirectionY = dy / distance;
    const force = (radius - distance) / radius;
    let directionX = forceDirectionX * force * this.getDensity();
    let directionY = forceDirectionY * force * this.getDensity();

    if (distance < radius && (directionX > 0.01 || directionY > 0.01)) {
      this.position.addTo({
        xPos: -directionX,
        yPos: -directionY,
      });

      return;
    }

    directionX = 0;
    directionY = 0;

    ({ distance, dx, dy } = this.distToCoordinates(
      this.position.baseX,
      this.position.baseY
    ));

    let isX = Math.floor(this.position.x) !== Math.floor(this.position.baseX),
      isY = Math.floor(this.position.y) !== Math.floor(this.position.baseY);

    if (isX) directionX = dx / 10;
    if (isY) directionY = dy / 10;

    if (isX || isY) {
      this.position.addTo({
        xPos: directionX,
        yPos: directionY,
      });

      if (distance < 1) {
        this.position.x = this.position.baseX;
        this.position.y = this.position.baseY;
      }
    }
  }

  accelerate() {
    this.velocity.addTo(this.accel);
  }

  draw(ctx) {
    if (this.color) ctx.fillStyle = this.color;
    if (this.strokeColor) ctx.strokeStyle = this.strokeColor;

    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.getSize(), 0, Math.PI * 2);
    ctx.closePath();

    if (this.color) ctx.fill();
    if (this.strokeColor) ctx.stroke();
  }

  changeSize(sizeAngle, size) {
    this.setSize(this.getSize() - 0.1);
  }

  distToParticle(p2) {
    const dx = p2.position.x - this.position.x;
    const dy = p2.position.y - this.position.y;
    return {
      distance: Math.sqrt(dx * dx + dy * dy),
      dx,
      dy,
    };
  }

  distToCoordinates(xPos, yPos) {
    const dx = xPos - this.position.x;
    const dy = yPos - this.position.y;
    return {
      distance: Math.sqrt(dx * dx + dy * dy),
      dx,
      dy,
    };
  }

  lineTo(ctx, p2, strokeColor) {
    ctx.strokeStyle = strokeColor ? strokeColor : this.strokeColor;
    ctx.beginPath();
    ctx.moveTo(this.position.x, this.position.y);
    ctx.lineTo(p2.position.x, p2.position.y);
    ctx.stroke();
  }

  checkBounds(canvas) {
    if (
      this.position.xPos <= 0 + this.size ||
      this.position.xPos > canvas.width - this.getSize()
    ) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (
      this.position.yPos < 0 + this.size ||
      this.position.yPos > canvas.height - this.getSize()
    ) {
      this.velocity.y = this.velocity.y * -1;
    }
  }

  get xPos() {
    return this.position.x;
  }

  set xPos(x) {
    this.position.x = x;
  }

  get yPos() {
    return this.position.y;
  }

  set yPos(y) {
    this.position.y = y;
  }

  getSize() {
    return this.size;
  }

  setSize(size) {
    this.size = size;
  }

  getDensity() {
    return this.density;
  }

  setDensity(density) {
    this.density = density;
  }
}
