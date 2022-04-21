import React from "react";

export default function Info({ setCurrentDisplay }) {
  return (
    <div className="modal">
      <div id="info">
        {`Word Games (beta 0.0.1)\n\nMobile only. Install for offline play!\n\nWant more games?\nVisit `}
        <a href="https://skedwards88.github.io/portfolio/">CnS Games</a>
        {`\n\nThanks to `}
        <a href="https://github.com/wordnik/wordlist">Wordnik</a>
        {` for their open source word list.`}
      </div>
      <button className="close" onClick={() => setCurrentDisplay("home")}>
        CLOSE
      </button>
    </div>
  );
}
