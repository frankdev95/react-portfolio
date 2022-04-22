import { useCallback, useEffect, useRef, useState } from "react";

const useParallax = (
  scrollThreshold,
  scrollOffset = 0,
  options = {
    root: null,
    rootMargin: "0px",
    threshold: 1.0,
  }
) => {
  const [scrollAmount, setScrollAmount] = useState(0);
  const componentRef = useRef();

  const scrollHandler = useCallback(() => {
    let componentScrollTop =
      componentRef.current.offsetTop + scrollOffset - window.innerHeight;

    const scroll = window.scrollY - componentScrollTop;
    if (scroll > scrollThreshold) return setScrollAmount(scrollThreshold);

    scroll >= 0 ? setScrollAmount(scroll) : setScrollAmount(0);
  }, [scrollThreshold]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        scrollHandler();
        window.addEventListener("scroll", scrollHandler);
      }
    }, options);

    if (componentRef.current) observer.observe(componentRef.current);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [options, scrollHandler]);

  return { componentRef, scrollAmount };
};

export default useParallax;
