import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import { debounce } from "../../helpers/functions";

const Header = React.forwardRef((props, ref) => {
  const { onClick, sectionBounds } = props;
  const headerRef = ref;
  const [headerSticky, setHeaderSticky] = useState(false);
  const [activeNav, setActiveNav] = useState("section-home");

  useEffect(() => {
    const headerEl = headerRef.current.getBoundingClientRect();
    const headerBottom =
      headerEl.bottom + window.scrollY || document.documentElement.scrollTop;
    const headerTop = headerBottom - headerEl.height;

    const createScrollHandler = () => {
      let currentScrollTop;

      let checkActiveSection = debounce(
        (scrollTop) => {
          Object.keys(sectionBounds).forEach((key) => {
            if (sectionBounds[key].isActive(scrollTop))
              setActiveNav(`section-${key}`);
          });
        },
        150,
        false
      );

      return () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > currentScrollTop && scrollTop > headerBottom)
          setHeaderSticky(true);
        if (scrollTop < currentScrollTop && scrollTop <= headerTop)
          setHeaderSticky(false);

        checkActiveSection(scrollTop);

        currentScrollTop = scrollTop;
      };
    };

    const scrollHandler = createScrollHandler();
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [headerRef, sectionBounds]);

  return (
    <header
      ref={headerRef}
      className={`container ${styles.header} ${
        headerSticky ? styles.sticky : ""
      } u-flex u-align-center`}
    >
      <nav className={`${styles.nav} u-clr-white`}>
        <ul className={`u-flex u-list ff-open-sans ${styles["nav__list"]}`}>
          <li
            className={`${styles["nav__item"]} ${
              activeNav === "section-home" ? styles.active : ""
            }`}
            onClick={onClick.bind(null, "home")}
          >
            <a className="u-link-unstyled" href="#section-home">
              Home
            </a>
          </li>
          <li
            className={`${styles["nav__item"]} ${
              activeNav === "section-about" ? styles.active : ""
            }`}
            onClick={onClick.bind(null, "about")}
          >
            <a className="u-link-unstyled" href="#about">
              About
            </a>
          </li>
          <li
            className={`${styles["nav__item"]} ${
              activeNav === "section-skills" ? styles.active : ""
            }`}
            onClick={onClick.bind(null, "skills")}
          >
            <a className="u-link-unstyled" href="#skills">
              Skills
            </a>
          </li>
          <li
            className={`${styles["nav__item"]} ${
              activeNav === "section-portfolio" ? styles.active : ""
            }`}
            onClick={onClick.bind(null, "portfolio")}
          >
            <a className="u-link-unstyled" href="#portfolio">
              Portfolio
            </a>
          </li>
          <li
            className={`${styles["nav__item"]} ${
              activeNav === "section-contact" ? styles.active : ""
            }`}
            onClick={onClick.bind(null, "contact")}
          >
            <a className="u-link-unstyled" href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
});

export default Header;
