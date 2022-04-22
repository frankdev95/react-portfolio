import wpIcon from "../../../assets/images/icons/wordpress.png";
import styles from "./PortfolioSliderItem.module.scss";

const stackImages = {
  wordpress: {
    img: wpIcon,
    alt: "WordPress icon",
  },
};

const PortItemStack = (props) => {
  const { stack, classes } = props;

  return (
    <div
      className={`${styles["portitem__stack"]} ${classes} u-flex u-flex-centered`}
    >
      <img src={stackImages[stack].img} alt="" />
    </div>
  );
};

export default PortItemStack;
