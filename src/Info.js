import React from "react";

export default function Info() {
  const [showInfo, setShowInfo] = React.useState(false);

  return showInfo ? (
    <div className="modal">
      <div id="info">
        {`Word Grid (beta 1.0)\n\nConnect adjacent letters to build words.\n\nDesigned by Colin\nBuilt by Sarah\n\nWant more games?\nVisit `}
        <a href="https://skedwards88.github.io/portfolio/">CnS Games</a>{`\n\nThanks to `}<a href="https://github.com/wordnik/wordlist">Wordnik</a>{` for their open source word list.`}
      </div>
      <button className="close" onClick={() => setShowInfo(false)}>
        CLOSE
      </button>
    </div>
  ) : (
    <button id="infoButton" onClick={() => setShowInfo(true)}></button>
  );
}
