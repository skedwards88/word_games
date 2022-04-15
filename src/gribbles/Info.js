import React from "react";

export default function Info({ timerDispatch }) {
  const [showInfo, setShowInfo] = React.useState(false);

  function handleShowInfo() {
    timerDispatch({ action: showInfo ? "play" : "pause" });
    setShowInfo(!showInfo);
  }

  return showInfo ? (
    <div className="modal">
      <div id="info">
        {`Gribbles\n\nConnect adjacent letters to build words. Can you find all the words before time is up?`}
      </div>
      <button className="close" onClick={() => handleShowInfo()}>
        CLOSE
      </button>
    </div>
  ) : (
    <button id="infoButton" onClick={() => handleShowInfo()}></button>
  );
}
