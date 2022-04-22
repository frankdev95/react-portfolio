import { useEffect, useMemo } from "react";

const useIntersectionObserver = (callbackFn, entries, options) => {
  let intersectionObserver = useMemo(
    () => new IntersectionObserver(callbackFn, options),
    [callbackFn, options]
  );

  useEffect(() => {
    entries.forEach((entry) => {
      intersectionObserver.observe(entry.current);
    });

    return () =>
      entries.forEach((entry) => intersectionObserver.unobserve(entry.current));
  }, [intersectionObserver, entries]);

  return intersectionObserver;
};

export default useIntersectionObserver;
