import { useEffect, useState } from "react";
import styles from "./AnimChar.module.scss";

let styleObjTimeoutId;

const AnimChar = (props) => {
  const { char, delay, isSpaced } = props;
  const animationDuration = 1000;
  const [styleObj, setStyleObj] = useState({
    animationName: "bounce-in-top",
    animationDuration: `${animationDuration}ms`,
    animationDelay: `${delay}ms`,
    animationFillMode: "forwards",
    marginRight: `${isSpaced && "20px"}`,
  });

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setStyleObj({
        animationName: "text-pop-up-top",
        animationDuration: "200ms",
        animationFillMode: "forwards",
        marginRight: `${isSpaced && "20px"}`,
      });
    }, delay + animationDuration);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [styleObjTimeoutId]);

  return (
    <span className={styles.char} style={styleObj}>
      {char}
    </span>
  );
};

export default AnimChar;
