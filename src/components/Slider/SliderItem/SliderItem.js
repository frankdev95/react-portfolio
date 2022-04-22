import styles from "./SliderItem.module.scss";

const SliderItem = (props) => {
  const { length, position, spacing } = props;
  const middleSlide = Math.ceil(length / 2);
  let posFromCenter = 0;

  posFromCenter =
    position < middleSlide ? position - middleSlide : middleSlide - position;

  let zPos = posFromCenter * 200;
  let xPos = (position - middleSlide) * spacing;

  let translate3d = `translate3d(${xPos}%, 0, ${zPos}px)`;

  return (
    <div
      className={`${styles["slider__item"]}`}
      style={{ transform: translate3d, transition: "transform .4s" }}
    >
      {props.children}
    </div>
  );
};

export default SliderItem;
