import React from "react";
import styles from "./Section.module.scss";

const Section = React.forwardRef((props, ref) => {
  const { margin = true, padding = false, classes, id } = props;

  return (
    <section
      className={`${margin ? styles["section__margin"] : ""} ${
        padding ? styles["section__padding"] : ""
      } ${classes ? classes : ""}`}
      id={id}
      ref={ref}
    >
      {props.children}
    </section>
  );
});

export default Section;
