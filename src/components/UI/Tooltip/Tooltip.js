import styles from "./Tooltip.module.scss";

const Tooltip = (props) => {
  const { text, position, theme } = props;
  return (
    <div
      className={`${styles.tooltip} ${
        theme === "light" ? styles.light : styles.dark
      }`}
    >
      <div className={`${styles["tooltip__inner"]}`}>
        <span className={`${styles["tooltip__text"]}`}>{text}</span>
      </div>
    </div>
  );
};

export default Tooltip;
