import TextParticle from "../../../canvas/TextParticle";
import Canvas from "../../../canvas/utils";

let { mouse } = Canvas;

let particles = [];
let initial = true;
let radius = 3,
  scale = 4;
let lineDistance = 20;
let canvasRef;

const breakpoints = ["(max-width: 80em)"];

// MEDIA QUERIES & RESPONSIVITY

const mediaBreakpointHandler = () => {
  let isMatched = false;

  return (bp) => {
    if (bp.matches && !isMatched) {
      isMatched = true;
      lineDistance = 15;
      radius = 2.25;
      for (let i = 0; i < particles.length; i++) {
        particles[i].position.baseX =
          particles[i].textXPos * radius * scale +
          getTextOffset(radius).xOffset;
        particles[i].position.baseY =
          particles[i].textYPos * radius * scale +
          getTextOffset(radius).yOffset;
        particles[i].position.y =
          particles[i].textYPos * radius * scale +
          getTextOffset(radius).yOffset;
        particles[i].size = radius;
      }
    } else if (isMatched) {
      isMatched = false;
      lineDistance = 20;
      radius = 3;
      for (let i = 0; i < particles.length; i++) {
        particles[i].position.baseX =
          particles[i].textXPos * radius * scale +
          getTextOffset(radius).xOffset;
        particles[i].position.baseY =
          particles[i].textYPos * radius * scale +
          getTextOffset(radius).yOffset;
        particles[i].position.y =
          particles[i].textYPos * radius * scale +
          getTextOffset(radius).yOffset;
        particles[i].size = radius;
      }
    }

    setBaseY();
    scatterParticles();
  };
};

// TEXT FUNCTIONS

const initText = (ctx, canvas, fontSize, fontType, lineMargin, text, color) => {
  let linesArr = text.split("\n");

  ctx.fillStyle = color;
  ctx.font = `${fontSize}px ${fontType}`;

  linesArr.forEach((line, index) => {
    ctx.fillText(line, 0, fontSize * 0.8 + index * (fontSize + lineMargin));
  });
};

const getFullTextHeight = () => {
  let max = 0,
    min = canvasRef.height;

  for (let i = 0; i < particles.length; i++) {
    if (particles[i].position.y > max)
      max = particles[i].position.y + particles[i].getSize() / 2;
    if (particles[i].position.y < min)
      min = particles[i].position.y - particles[i].getSize() / 2;
  }

  return max - min;
};

// PARTICLE FUNCTIONS

const handleParticles = (ctx) => {
  for (let i = 0; i < particles.length; i++) {
    particles[i].draw(ctx);
    particles[i].repelWithinRadius(mouse.xPos, mouse.yPos, mouse.radius);

    for (let j = i; j < particles.length; j++) {
      if (particles[i].distToParticle(particles[j]).distance < lineDistance) {
        particles[i].lineTo(ctx, particles[j]);
      }
    }
  }
};

export const initParticles = (ctx, canvas) => {
  initText(
    ctx,
    canvas,
    12,
    "Georgia",
    0,
    "Hi,\nI'm Frank,\na Web Developer",
    "white"
  );

  const textCoordinates = ctx.getImageData(0, 0, 90, 50);

  for (let y = 0; y < textCoordinates.height; y++) {
    for (let x = 0; x < textCoordinates.width; x++) {
      let index = y * textCoordinates.width * 4 + x * 4 + 3;
      if (textCoordinates.data[index] > 128)
        particles.push(
          new TextParticle({
            x: x * radius * scale + getTextOffset(radius).xOffset,
            y: y * radius * scale + getTextOffset(radius).yOffset,
            tx: x,
            ty: y,
            size: radius,
            color: "#30d987",
            strokeColor: "#30d987",
          })
        );
    }
  }

  let breakpointHandler = mediaBreakpointHandler();

  breakpoints.forEach((breakpoint) => {
    let bp = window.matchMedia(breakpoint);
    breakpointHandler(bp);
    bp.addEventListener("change", breakpointHandler);
  });
};

const setBaseY = () => {
  const textHeight = getFullTextHeight(canvasRef);
  for (let i = 0; i < particles.length; i++) {
    particles[i].position.baseY += canvasRef.height / 2 - textHeight / 2;
  }
};

const scatterParticles = () => {
  for (let i = 0; i < particles.length; i++) {
    particles[i].position.y = Math.random() * canvasRef.height;
    particles[i].position.x = (Math.random() * canvasRef.width) / 2;
  }
};

const getTextOffset = (radius) => ({
  xOffset: (window.innerWidth / 100) * 5 + radius / 2,
  yOffset: 0 + radius / 2,
});

const draw = (ctx, canvas) => {
  canvasRef = canvas;
  if (initial) {
    initParticles(ctx, canvas);
    initial = false;
  }

  return () => {
    handleParticles(ctx);
  };
};

const onUnmount = () => {};

export default draw;
