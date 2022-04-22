import styles from "./SocialIcon.module.scss";

const SocialIcon = (props) => {
  const { img, url } = props;

  return (
    <a className={`${styles["social-icon"]}`} target="_blank" href={url}>
      <div className={`${styles["social-icon__inner"]} u-flex u-flex-centered`}>
        {img}
      </div>
      <div className={`${styles["social-icon__inner"]} u-flex u-flex-centered`}>
        {img}
      </div>
    </a>
  );
};

export default SocialIcon;
