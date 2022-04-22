import styles from "./Slider.module.scss";
import arrow from "../../assets/images/icons/right-arrow.png";
import SliderItem from "./SliderItem/SliderItem";
import { useEffect, useState } from "react";

const Slider = (props) => {
  const { items, spacing } = props;
  const [sliderItems, setSliderItems] = useState();

  useEffect(() => {
    setSliderItems(
      items.map((item, index) => {
        item.position = index + 1;

        return (
          <SliderItem
            key={item.id}
            position={item.position}
            length={items.length}
            spacing={spacing}
          >
            {item.JSXElement}
          </SliderItem>
        );
      })
    );
  }, [items, spacing]);

  const clickHandler = (dir) => {
    setSliderItems(
      items.map((item) => {
        item.position += dir;
        if (item.position === 0) item.position = items.length;
        if (item.position === items.length + 1) item.position = 1;

        return (
          <SliderItem
            key={item.id}
            position={item.position}
            length={items.length}
            spacing={spacing}
          >
            {item.JSXElement}
          </SliderItem>
        );
      })
    );
  };

  return (
    <div className={styles.slider}>
      <button
        className={`${styles["slider__arrow"]}`}
        onClick={clickHandler.bind(null, 1)}
      >
        <img src={arrow} alt="arrow left" />
      </button>
      {sliderItems}
      <button
        className={`${styles["slider__arrow"]} ${styles.right}`}
        onClick={clickHandler.bind(null, -1)}
      >
        <img src={arrow} alt="arrow right" />
      </button>
    </div>
  );
};

export default Slider;
