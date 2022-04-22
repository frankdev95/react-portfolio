import React, { useEffect, useRef, useState } from "react";
import styles from "./Bubble.module.scss";
import SettingsIcon from "../../SVG/SettingsIcon";

const Bubble = React.memo((props) => {
  const [isDraggable, setIsDraggable] = useState(false);
  const settingsRef = useRef();
  const { onClick, onClose, setCoords } = props;
  let mouseHeldReq, start;

  useEffect(() => {
    if (isDraggable) {
      const settingsEl = settingsRef.current;

      window.addEventListener("mousemove", dragActive);

      return () => {
        setCoords({
          xPos: settingsEl.getBoundingClientRect().left,
          yPos: settingsEl.getBoundingClientRect().top,
          size: settingsEl.getBoundingClientRect().width,
        });
        window.removeEventListener("mousemove", dragActive);
      };
    }
  }, [isDraggable, setCoords]);

  const mouseHeldHandler = (e) => {
    const requestAnimationHandler = (time) => {
      if (!start) start = time;
      const elapsed = time - start;

      // if the user has held the mouse on the settings for longer than 300ms then allow dragging
      if (elapsed > 300) {
        cancelAnimationFrame(mouseHeldReq); // not essential, but good practice to clear animation if still exists in memory
        setIsDraggable(true);
        onClose();
        return;
      }

      mouseHeldReq = requestAnimationFrame(requestAnimationHandler);
    };

    mouseHeldReq = requestAnimationFrame(requestAnimationHandler);
  };

  const mouseReleasedHandler = (e) => {
    if (mouseHeldReq) {
      cancelAnimationFrame(mouseHeldReq);
      start = null;
    }
    if (e.type === "mouseup") {
      if (isDraggable) return setIsDraggable(false);
      onClick();
    }
  };

  // move the settings bubble element to the position of the users mouse
  const dragActive = (e) => {
    settingsRef.current.style.top = `${
      e.clientY - settingsRef.current.offsetHeight / 2
    }px`;
    settingsRef.current.style.left = `${
      e.clientX - settingsRef.current.offsetWidth / 2
    }px`;
  };

  return (
    <div
      className={`${styles.bubble} ${
        isDraggable ? styles["bubble__active"] : ""
      }`}
      onMouseDown={mouseHeldHandler}
      onMouseUp={mouseReleasedHandler}
      onMouseLeave={mouseReleasedHandler}
      ref={settingsRef}
    >
      <SettingsIcon className={styles["bubble__icon"]} />
    </div>
  );
});

export default Bubble;
