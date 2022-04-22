import Particle from "../../../canvas/Particle";
import Canvas from "../../../canvas/utils";

let { mouse } = Canvas;

let hue = 0,
  sat = 0;

const particles = [];

const handleParticles = (ctx, canvas) => {
  for (let i = 0; i < particles.length; i++) {
    particles[i].addVelocity();
    particles[i].accelerate();
    particles[i].checkBounds(canvas);
    particles[i].changeSize();
    particles[i].draw(ctx, canvas);

    for (let j = i; j < particles.length; j++) {
      if (particles[i].distToParticle(particles[j]).distance < 50)
        particles[i].lineTo(ctx, particles[j]);
    }

    if (particles[i].getSize() <= 0.3) {
      particles.splice(i, 1);
      i--;
    }
  }
};

export const initParticles = (amount = 50) => {
  for (let i = 0; i < amount; i++) {
    particles.push(
      new Particle({
        x: mouse.xPos,
        y: mouse.yPos,
        color: `hsl(${hue}, ${sat}%, 50%)`,
      })
    );
  }
};

const draw = (ctx, canvas) => {
  handleParticles(ctx, canvas);
  hue += 5;
  sat++;
};

export default draw;
