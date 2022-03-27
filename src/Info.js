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
        {`Word Grid (beta 2.4)\n\nConnect adjacent letters to build words.\n\nWant more games?\nVisit `}
        <a href="https://skedwards88.github.io/portfolio/">CnS Games</a>
        {`\n\nThanks to `}
        <a href="https://github.com/wordnik/wordlist">Wordnik</a>
        {` for their open source word list.`}
      </div>
      <button className="close" onClick={() => handleShowInfo()}>
        CLOSE
      </button>
    </div>
  ) : (
    <button id="infoButton" onClick={() => handleShowInfo()}></button>
  );
}
