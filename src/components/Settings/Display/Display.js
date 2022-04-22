import { useEffect, useRef, useState } from "react";
import styles from "./Display.module.scss";

const Display = (props) => {
  const displayRef = useRef();
  const [styleObj, setStyleObj] = useState({});
  const { coords } = props;

  useEffect(() => {
    if (coords) {
      const left =
        coords.xPos + coords.size / 2 > window.innerWidth / 2
          ? coords.xPos - displayRef.current.getBoundingClientRect().width - 20
          : coords.xPos + coords.size + 20;

      const top =
        coords.yPos + coords.size / 2 > window.innerHeight / 2
          ? coords.yPos -
            (displayRef.current.getBoundingClientRect().height - coords.size)
          : coords.yPos;

      setStyleObj({
        left: `${left}px`,
        top: `${top}px`,
      });
    }
  }, [coords]);

  return (
    <div
      className={`${styles.display} ${styles["display__active"]}`}
      style={styleObj}
      ref={displayRef}
    >
      <h2 className="fw-500">Settings</h2>
    </div>
  );
};

export default Display;
