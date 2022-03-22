import React from "react";

export function FoundWords({ foundWords }) {
  return (
    <div id="foundWords">
      {foundWords.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
}

export function AllWords({ foundWords, allWords }) {
  const foundWordDivs = foundWords.map((word, index) => (
    <div key={index}>{word}</div>
  ));

  const unfoundWords = allWords.filter((word) => !foundWords.includes(word));

  const unfoundWordDivs = unfoundWords.map((word, index) => (
    <div className="computerWord" key={index}>
      {word}
    </div>
  ));
  return (
    <div id="foundWords">
      {foundWordDivs}
      {unfoundWordDivs}
    </div>
  );
}
