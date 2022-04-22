import { useEffect, useRef } from "react";

const useCanvas = (draw, options, stopOnScroll = false) => {
  const canvasRef = useRef();
  const { contextType, events } = options;

  useEffect(() => {
    let animationId, canvasIntersectionObserver;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext(contextType || "2d");

    if (stopOnScroll) {
      canvasIntersectionObserver = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (!entry.isIntersecting && entry.intersectionRatio === 0) {
            if (animationId) {
              window.cancelAnimationFrame(animationId);
              animationId = null;
              return;
            }
          }
          if (!animationId) animationId = window.requestAnimationFrame(render);
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0,
        }
      );

      canvasIntersectionObserver.observe(canvas);
    }

    if (events) handleCanvasEvents(events, canvas);

    resizeCanvasToSize(canvas);
    let renderFn = draw(ctx, canvas);

    const render = () => {
      predraw(ctx, canvas);
      renderFn();
      animationId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationId);
      if (events) handleCanvasEvents(events, canvas, null);
      if (stopOnScroll) canvasIntersectionObserver.unobserve(canvas);
    };
  }, [stopOnScroll, draw, contextType, events]);

  return canvasRef;
};

function predraw(ctx, canvas) {
  resizeCanvasToSize(canvas);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function handleCanvasEvents(events, canvas, action = "add") {
  events.forEach((event) => {
    if (action === "add") {
      canvas.addEventListener(event.name, event.callbackFn.bind(null, canvas));
      return;
    }
    canvas.removeEventListener(event.name, event.callbackFn.bind(null, canvas));
  });
}

function resizeCanvasToSize(canvas) {
  const { width, height } = canvas.getBoundingClientRect(); // receives the actual current width as is inside the browser

  // checks if the canvas objects dimension properties are correct with the actual current width, otherwise stretching occurs
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
    return true;
  }

  return false;
}

export default useCanvas;
