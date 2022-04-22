import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom";
import useQuery from "../../hooks/useQuery";
import items, { portfolioItems } from "../../model/portfolio";
import styles from "./Portfolio.module.scss";
import Section from "../Layout/Section";
import Container from "../Layout/Container";
import SectionHeading from "../Typography/SectionHeading";
import Slider from "../Slider/Slider";
import PortfolioGridItem from "./PortfolioGridItem/PortfolioGridItem";
import Modal from "../UI/Modal/Modal";

const Portfolio = React.forwardRef((props, ref) => {
  const [sliderSpacing, setSliderSpacing] = useState(40);
  const [showSlider, setShowSlider] = useState(true);
  const [modalItem, setModalItem] = useState(null);

  useQuery(
    useMemo(
      () => [
        {
          query: "(max-width: 75em)",
          callbackFn: (bp) => {
            if (bp.matches) {
              setSliderSpacing(20);
              return;
            }
            setSliderSpacing(40);
          },
        },
        {
          query: "(max-width: 56.25em)",
          callbackFn: (bp) => {
            if (bp.matches) {
              setShowSlider(false);
              return;
            }
            setShowSlider(true);
          },
        },
      ],
      []
    )
  );

  const showModalHandler = (portfolioItem) => setModalItem(portfolioItem);

  return (
    <Section id="section-portfolio" ref={ref} margin={false} padding={true}>
      <Container>
        <SectionHeading
          primaryTitle="My Work"
          secondaryTitle="Portfolio"
          secondaryColor="grey-light-2"
        />
        {showSlider ? (
          <Slider items={items} spacing={sliderSpacing} />
        ) : (
          <div className={`${styles["port__grid"]} u-grid`}>
            {portfolioItems.map((item, index) => (
              <PortfolioGridItem
                key={index}
                item={item}
                onShowModal={showModalHandler.bind(null, item)}
              />
            ))}
          </div>
        )}
        {modalItem &&
          ReactDOM.createPortal(
            <Modal onClose={() => setModalItem(null)}>
              <div className={`${styles["port__modal-item"]}`}>
                <div className={`${styles["port__modal-item-banner"]}`}>
                  <img
                    src={modalItem.bannerImg.img}
                    alt={modalItem.bannerImg.alt}
                  />
                </div>
                <div className={`${styles["port__modal-item-content"]}`}>
                  <div
                    className={`${styles["port__modal-item-name"]} u-margin-top-24`}
                  >
                    <h3 className="h3">{modalItem.name}</h3>
                  </div>
                  <div className={`${styles["port__modal-item-description"]}`}>
                    {modalItem.description.map((p, index) => (
                      <p key={`p${index}`}>{p}</p>
                    ))}
                    <a
                      className="btn btn-primary"
                      target="_blank"
                      href={modalItem.url}
                    >
                      <span>Visit Site</span>
                    </a>
                  </div>
                </div>
              </div>
            </Modal>,
            document.getElementById("modal")
          )}
      </Container>
    </Section>
  );
});

export default Portfolio;
