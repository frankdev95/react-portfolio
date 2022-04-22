import { useState } from "react";
import styles from "./Footer.module.scss";
import LinkedInIcon from "../SVG/LinkedIn";
import GitHubIcon from "../SVG/Github";
import SocialIcon from "./SocialIcon";
import UpArrow from "../SVG/UpArrow";

const Footer = () => {
  const scrollToTopHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className={`${styles.footer} u-bg-gunmetal-dark u-flex u-flex-centered`}
    >
      <div
        className={`${styles["footer__scrolltop"]}`}
        onClick={scrollToTopHandler}
      >
        <UpArrow />
        <UpArrow />
      </div>
      <div className={`u-flex u-align-center`}>
        <SocialIcon
          img={<GitHubIcon fill="#30d987" />}
          id={styles["github-icon"]}
          url="https://github.com/frankdev95"
        />
        <SocialIcon
          img={<LinkedInIcon fill="#30d987" />}
          id={styles["linkedin-icon"]}
          url="https://www.linkedin.com/in/frank-lockett-dev/"
        />
      </div>
    </footer>
  );
};

export default Footer;
