import styles from "./SectionHeading.module.scss";
import useParallax from "../../hooks/useParallax";

const SectionHeading = (props) => {
  const { primaryTitle, secondaryTitle, secondaryColor } = props;
  const { componentRef, scrollAmount } = useParallax(900);

  return (
    <div
      ref={componentRef}
      className={`${styles["section-heading"]} u-margin-bottom-56`}
    >
      <h2 className={`${styles["heading__primary"]} h1 u-clr-emeral`}>
        {primaryTitle}
      </h2>
      <h2
        className={`${styles["section-heading__secondary"]} u-clr-${secondaryColor}`}
        style={{ transform: `translate(${300 - scrollAmount * 0.5}px, -50%)` }}
      >
        {secondaryTitle}
      </h2>
    </div>
  );
};

export default SectionHeading;
