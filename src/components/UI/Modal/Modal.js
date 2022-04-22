import styles from "./Modal.module.scss";

const Backdrop = (props) => {
  return (
    <div
      className={`${styles["modal__backdrop"]}`}
      onClick={props.onClick}
    ></div>
  );
};

const Modal = (props) => {
  return (
    <div className={`${styles["modal__container"]} u-flex u-flex-centered`}>
      <Backdrop onClick={props.onClose} />
      {props.children}
    </div>
  );
};

export default Modal;
