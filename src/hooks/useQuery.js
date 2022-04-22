import { useEffect } from "react";

const useQuery = (queryArr) => {
  useEffect(() => {
    queryArr.forEach((queryObj) => {
      let bp = window.matchMedia(queryObj.query);
      queryObj.callbackFn(bp);
      bp.addEventListener("change", queryObj.callbackFn);
    });
  }, [queryArr]);
};

export default useQuery;
