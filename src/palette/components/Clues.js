import React from "react";

function Clue({ clue, clueMatch, letters, clueReveal }) {
  const boxes = clue.map((color, index) => (
    <div className={`clueBox ${color}`} key={`${index}`}>{clueReveal ? letters[index] : ""}</div>
  ));

  return <div className={`clue ${clueMatch ? "matched" : ""}`}>{boxes}</div>;
}

export default function Clues({ clues, clueMatches, clueLetters, clueReveals }) {
  const clueDisplays = clues.map((clue, index) => (
    <Clue clue={clue} clueMatch={clueMatches[index]} letters={clueLetters[index]} clueReveal={clueReveals[index]} key={index}></Clue>
  ));

  return <div id="clues">{clueDisplays}</div>;
}
