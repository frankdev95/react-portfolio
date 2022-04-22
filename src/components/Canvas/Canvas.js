import useCanvas from "../../hooks/useCanvas";

const Canvas = (props) => {
  const { classes, drawFn, options, stopOnScroll } = props;
  const canvasRef = useCanvas(drawFn, options || {}, stopOnScroll);

  let classStr;
  if (classes) classStr = classes.join(" ");

  return <canvas className={classStr || ""} ref={canvasRef} />;
};

export default Canvas;
