import React, { useEffect, useRef, useState } from "react";
import "./App.scss";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Portfolio from "./components/Portfolio/Portfolio";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const sectionRefs = {
  header: null,
  home: null,
  about: null,
  skills: null,
  portfolio: null,
  contact: null,
};

function App() {
  const [sectionBounds, setSectionBounds] = useState({});

  sectionRefs.header = useRef();
  sectionRefs.home = useRef();
  sectionRefs.about = useRef();
  sectionRefs.skills = useRef();
  sectionRefs.portfolio = useRef();
  sectionRefs.contact = useRef();

  useEffect(() => {
    let headerEl = sectionRefs["header"].current;
    let sectionObj = {};
    let sectionRefsKeys = Object.keys(sectionRefs);

    sectionRefsKeys.forEach((key) => {
      if (key !== sectionRefsKeys[0]) {
        let section = sectionRefs[key].current;
        let top =
          section.getBoundingClientRect().top +
          window.scrollY -
          headerEl.offsetHeight;
        let bottom = top + section.offsetHeight;

        let bounds = {
          top,
          bottom,
          isActive: function (scrollY) {
            if (key !== sectionRefsKeys[sectionRefsKeys.length - 1]) {
              return (
                scrollY >= Math.floor(this.top - headerEl.offsetHeight - 1) &&
                scrollY <= this.bottom
              );
            }

            return scrollY + window.innerHeight >= document.body.offsetHeight;
          },
        };

        sectionObj[key] = bounds;
      }
    });

    setSectionBounds(sectionObj);
  }, []);

  const navClickedHandler = (section) => {
    const elToScrollTop =
      sectionRefs[section].current.getBoundingClientRect().top;
    const headerEl = sectionRefs["header"].current;

    let scrollAmount =
      window.scrollY > headerEl.offsetHeight
        ? window.scrollY + elToScrollTop - headerEl.offsetHeight
        : window.scrollY + elToScrollTop - headerEl.offsetHeight * 2;

    window.scrollTo(0, scrollAmount);
  };

  return (
    <React.Fragment>
      <Header
        onClick={navClickedHandler}
        sectionBounds={sectionBounds}
        ref={sectionRefs.header}
      />
      <main>
        <Hero ref={sectionRefs.home} />
        <About ref={sectionRefs.about} />
        <Skills ref={sectionRefs.skills} />
        <Portfolio ref={sectionRefs.portfolio} />
        <Contact ref={sectionRefs.contact} />
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default App;
