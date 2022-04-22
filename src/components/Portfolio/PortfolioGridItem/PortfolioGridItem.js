import styles from "./PortfolioGridItem.module.scss";

const PortfolioGridItem = (props) => {
  const { item, onShowModal } = props;
  const description = item.description.join(" ").substring(0, 200);
  return (
    <div className={`${styles["portitem"]} u-flex u-flex-column`}>
      <div className={`${styles["portitem__banner"]}`}>
        <img src={item.bannerImg.secondaryImg} alt={item.bannerImg.alt} />
      </div>
      <div className={`${styles["portitem__content"]} u-flex u-flex-column`}>
        <h3 className="h3 u-margin-vertical-24">{item.name}</h3>
        <p className="u-margin-bottom-24">
          {`${description.substring(
            0,
            description.lastIndexOf(" ", description.length - 1)
          )}...`}
        </p>
        <button
          className="btn btn-primary btn--medium"
          aria-haspopup="dialog"
          aria-controls="ModalDialog-Portfolio"
          onClick={onShowModal}
        >
          Read more
        </button>
      </div>
    </div>
  );
};

export default PortfolioGridItem;
