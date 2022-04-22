import { Fragment, useCallback, useMemo, useState } from "react";
import Bubble from "./Bubble/Bubble";
import Display from "./Display/Display";
import { debounce } from "../../helpers/functions";

const Settings = () => {
  const [toggleDisplay, setToggleDisplay] = useState(false);
  const [settingsCoords, setSettingsCoords] = useState(null);

  const bubbleClickHandler = useMemo(
    () => debounce(() => setToggleDisplay((prev) => !prev), 300),
    []
  );

  const setCoords = useCallback((coords) => setSettingsCoords(coords), []);

  return (
    <Fragment>
      <Bubble
        onClick={bubbleClickHandler}
        onClose={useCallback(() => setToggleDisplay(false), [])}
        setCoords={setCoords}
      />
      {toggleDisplay && <Display coords={settingsCoords} />}
    </Fragment>
  );
};

export default Settings;
