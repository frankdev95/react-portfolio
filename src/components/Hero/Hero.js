import React, { useMemo, useState } from "react";
import styles from "./Hero.module.scss";
import draw, { options } from "./canvas/hero";
import Canvas from "../Canvas/Canvas";
import Container from "../Layout/Container";
import Section from "../Layout/Section";
import useQuery from "../../hooks/useQuery";
import IntroSentence from "./IntroSentence";

const Hero = React.forwardRef((props, ref) => {
  const [showCanvas, setShowCanvas] = useState(false);

  const queries = useMemo(
    () => [
      {
        query: "(max-width: 57.5em)",
        callbackFn: (e) => {
          if (e.matches) {
            setShowCanvas(false);
            return;
          }

          setShowCanvas(true);
        },
      },
    ],
    []
  );

  useQuery(queries);

  return (
    <Section
      id="section-home"
      classes={`${styles.hero}`}
      margin={false}
      ref={ref}
    >
      <Container
        classes={`${styles["hero__container"]} u-flex u-align-center`}
        type="padding"
      >
        {showCanvas ? (
          <Canvas
            drawFn={draw}
            classes={[styles["hero__canvas"]]}
            options={options}
            stopOnScroll={true}
          />
        ) : (
          <IntroSentence
            classes={`${styles["hero__sentence"]}`}
            sentence="Hi, <br> I'm Frank, <br> a Web Developer"
          />
        )}
      </Container>
    </Section>
  );
});

export default Hero;
