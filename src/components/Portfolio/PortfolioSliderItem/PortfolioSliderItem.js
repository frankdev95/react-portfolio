import { useState, useRef, useEffect, useReducer } from "react";
import styles from "./PortfolioSliderItem.module.scss";
import ScrollDownIcon from "../../SVG/ScrollDownIcon";
import CancelIcon from "../../SVG/CancelIcon";
import PortItemStack from "./PortItemStack";

const PortfolioSliderItem = (props) => {
  const [bannerActive, setBannerActive] = useState(false);
  const [bannerScroll, setBannerScroll] = useState(false);
  const bannerInnerRef = useRef();
  const { item } = props;

  useEffect(() => {
    let intervalId;
    let bannerEl = bannerInnerRef.current;

    if (bannerScroll) {
      bannerEl.scrollBy(0, bannerEl.scrollHeight / 10);

      intervalId = setInterval(() => {
        bannerEl.scrollBy(0, bannerEl.scrollHeight / 10);

        if (
          bannerEl.scrollTop + bannerEl.clientHeight ===
          bannerEl.scrollHeight
        )
          setBannerScroll(false);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [bannerScroll]);

  return (
    <div className={`${styles["portitem"]} u-flex u-flex-column`}>
      <div
        className={`${styles["portitem__banner"]} ${
          bannerActive ? styles.active : ""
        }`}
        onMouseEnter={() => setBannerActive(true)}
        onMouseLeave={() => {
          setBannerActive(false);
          setBannerScroll(false);
        }}
      >
        <h2 className={`${styles["portitem__name"]} h2`}>{item.name}</h2>
        <div
          className={`${styles["portitem__scroll"]}`}
          onClick={() => setBannerScroll((prev) => !prev)}
        >
          <ScrollDownIcon
            className={`${styles["portitem__scroll-init"]} ${
              bannerScroll ? styles.active : ""
            }`}
          />
          <CancelIcon
            className={`${styles["portitem__scroll-cancel"]} ${
              bannerScroll ? styles.active : ""
            }`}
          />
        </div>
        <div
          className={`${styles["portitem__banner-inner"]}`}
          ref={bannerInnerRef}
        >
          <img className="" src={item.bannerImg.img} alt={item.bannerImg.alt} />
        </div>
      </div>
      <div className={`${styles["portitem__content"]} u-flex u-flex-column`}>
        <PortItemStack stack={item.stack} />
        {item.description.map((p, index) => (
          <p key={`p${index}`}>{p}</p>
        ))}
        <a className="btn btn-primary" target="_blank" href={item.url}>
          <span>Visit Site</span>
        </a>
      </div>
    </div>
  );
};

export default PortfolioSliderItem;
