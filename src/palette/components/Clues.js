import React from "react";

function Clue({ clue, clueMatch }) {
  const boxes = clue.map((color, index) => (
    <div className={`clueBox ${color}`} key={`${index}`}></div>
  ));

  return <div className={`clue ${clueMatch ? "matched" : ""}`}>{boxes}</div>;
}

export default function Clues({ clues, clueMatches }) {
  const clueDisplays = clues.map((clue, index) => (
    <Clue clue={clue} clueMatch={clueMatches[index]} key={index}></Clue>
  ));

  return <div id="clues">{clueDisplays}</div>;
}
