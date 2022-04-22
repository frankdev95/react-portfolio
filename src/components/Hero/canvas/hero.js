import { initParticles } from "./hero-bg";
import drawText from "./hero-text";
import Canvas from "../../../canvas/utils";

let { mouse } = Canvas;

const draw = (ctx, canvas) => drawText(ctx, canvas);

export const options = {
  events: [
    {
      name: "click",
      callbackFn: (canvas, e) => {
        mouse.xPos = e.clientX - canvas.getBoundingClientRect().left;
        mouse.yPos = e.clientY - canvas.getBoundingClientRect().top;
        initParticles(1);
      },
    },
    {
      name: "mousemove",
      callbackFn(canvas, e) {
        mouse.xPos = e.clientX - canvas.getBoundingClientRect().left;
        mouse.yPos = e.clientY - canvas.getBoundingClientRect().top;
        initParticles(1);
      },
    },
  ],
};

export default draw;
