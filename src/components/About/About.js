import React, { useMemo } from "react";
import styles from "./About.module.scss";
import Container from "../Layout/Container";
import Section from "../Layout/Section";

import useParallax from "../../hooks/useParallax";

const About = React.forwardRef((props, ref) => {
  let scrollMultiplier = 0.3;
  let scrollThreshold = 200 / scrollMultiplier;
  const options = useMemo(
    () => ({
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    }),
    []
  );

  const { componentRef, scrollAmount } = useParallax(
    scrollThreshold,
    0,
    options
  );

  return (
    <Section id="section-about" ref={ref} padding={true} margin={false}>
      <Container>
        <div
          className={`${styles.about} u-flex u-align-center`}
          ref={componentRef}
        >
          <div>
            <h2
              className="heading--xxl u-clr-grey-light"
              style={{
                transform: `translateX(${
                  -200 + scrollAmount * scrollMultiplier
                }px)`,
                transition: "transform .4s ease-out",
              }}
            >
              About
            </h2>
            <h2
              className="h1 u-clr-emeral"
              style={{
                transform: `translateY(${
                  200 - scrollAmount * scrollMultiplier
                }px)`,
                transition: "transform .4s ease-out",
              }}
            >
              Me
            </h2>
          </div>
          <p
            style={{
              transform: `translateX(${
                200 - scrollAmount * scrollMultiplier
              }px)`,
              transition: "transform .4s ease-out",
            }}
          >
            I am a freelance Web Developer with a keen interest in front and
            back end development. I bring passion and fine atention to detail to
            all my work, and forever strive to improve my skills and knowledge
            through my dedication to the craft.
          </p>
        </div>
      </Container>
    </Section>
  );
});

export default About;
