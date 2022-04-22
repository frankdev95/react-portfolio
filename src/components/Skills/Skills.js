import React, { useMemo, useRef, useState, useCallback } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import styles from "./skills.module.scss";
import FrontEndIcon from "../SVG/FrontEndIcon";
import BackEndIcon from "../SVG/BackEndIcon";
import Container from "../Layout/Container";
import Section from "../Layout/Section";
import Skill from "./Skill/Skill";
import SectionHeading from "../Typography/SectionHeading";

const skills = {
  frontEnd: {
    title: "Front End",
    icon: <FrontEndIcon />,
    alt: "front end skills icon",
    skills: [
      {
        skill: "HTML",
        percentage: 90,
      },
      {
        skill: "CSS",
        percentage: 90,
      },
      {
        skill: "SASS",
        percentage: 70,
      },
      {
        skill: "JavaScript",
        percentage: 80,
      },
      {
        skill: "ReactJS",
        percentage: 70,
      },
    ],
  },
  backEnd: {
    title: "Back End",
    icon: <BackEndIcon />,
    alt: "back end skills icon",
    skills: [
      {
        skill: "PHP",
        percentage: 65,
      },
      {
        skill: "Liquid",
        percentage: 60,
      },
      {
        skill: "Java",
        percentage: 70,
      },
      {
        skill: "Python",
        percentage: 40,
      },
      {
        skill: "Node.js",
        percentage: 60,
      },
      {
        skill: "MySQL",
        percentage: 60,
      },
      {
        skill: "MongoDB",
        percentage: 40,
      },
    ],
  },
};

const Skills = React.forwardRef((props, ref) => {
  const [isIntersected, setIsIntersected] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("frontEnd");
  const skillSectionRef = useRef();

  useIntersectionObserver(
    useCallback((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.unobserve(entry.target);
        }
      });
    }, []),
    useMemo(() => [skillSectionRef], []),
    useMemo(
      () => ({
        root: null,
        rootMargin: "0px",
        threshold: 0.8,
      }),
      []
    )
  );

  return (
    <Section
      id="section-skills"
      classes="u-bg-gunmetal"
      padding={true}
      margin={false}
      ref={ref}
    >
      <Container>
        <SectionHeading
          primaryTitle="Skillset"
          secondaryTitle="Skills"
          secondaryColor="dark"
        />
        <div className="o-row u-clr-white fw-300">
          <div
            className={`${styles["skills__summary"]} o-row__column o-row__column--span-4 o-row__column--span-12@md-desktop`}
          >
            <p className="u-margin-bottom-24">
              Since my first introduction to programming, I was inspired by the
              versitility and capabilities offered to me. This introduction
              sparked a genuine intrigue and passion to learn more. I have
              devled into many areas of programming, however my field of
              expertise lies within Web Development.
            </p>
            <p className="u-margin-bottom-24">
              I have been given some great opportunities which has allowed me
              experience in multiple languages, libraries and frameworks.
              However, my proficiencies are in WordPress and the MERN stack.
            </p>
            <p>
              I have a passion for responsiveness, interactivity, animation,
              userbility and speed, and always strive to enhance my skillset and
              broaden my scope of knowledge.
            </p>
          </div>
          <div
            ref={skillSectionRef}
            className={`${styles["skills__container"]} u-flex o-row__column o-row__column--span-8 `}
          >
            <div className={`${styles["skills__selectors"]}`}>
              {Object.keys(skills).map((key) => {
                return (
                  <div
                    className={`${styles["skills__selector"]}`}
                    onClick={() => setCurrentSkill(key)}
                  >
                    <div
                      className={`${styles["skills__selector-inner"]} ${
                        currentSkill === key ? styles.active : ""
                      } u-flex u-flex-centered`}
                    >
                      {skills[key].icon}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={`${styles["skills__preview"]}`}>
              <h2 className="h2 u-clr-white u-margin-bottom-32">
                {skills[currentSkill].title}
              </h2>
              {skills[currentSkill].skills.map((skill, index) => (
                <Skill
                  name={skill.skill}
                  percentage={skill.percentage}
                  isIntersected={isIntersected}
                  timing={index * 200}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
});

export default Skills;
