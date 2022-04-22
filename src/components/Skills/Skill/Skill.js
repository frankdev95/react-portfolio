import styles from "./Skill.module.scss";

const Skill = (props) => {
  const { name, percentage, isIntersected, timing } = props;

  return (
    <div className={styles.skill}>
      <h4 className={styles["skill__name"]}>{name}</h4>
      <div className={styles["skill__outer"]}>
        <div
          className={styles["skill__inner"]}
          style={{
            width: `${isIntersected ? `${percentage}%` : "0%"}`,
            transition: `width .8s ${timing / 1000}s ease-out`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default Skill;
