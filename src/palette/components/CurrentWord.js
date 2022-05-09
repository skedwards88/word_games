import React from "react";

export default function CurrentWord({ letters, colors }) {
  //todo change styling if capitalize qu
  const blocks = letters.map((letter, index) => (
    <div key={index} className={`guessBox ${colors[index]}`}>
      {letter.toUpperCase()}
    </div>
  ));

  return <div id="currentWord">{blocks}</div>;
}
