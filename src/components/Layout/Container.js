import styles from "./Container.module.scss";

const Container = (props) => {
  const { type, classes } = props;

  return (
    <div
      className={`${
        type === "padding"
          ? styles["container--padding"]
          : styles["container--margin"]
      } ${classes}`}
    >
      {props.children}
    </div>
  );
};

export default Container;
