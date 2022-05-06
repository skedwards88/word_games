import React from "react";

export default function CurrentWord({ letters, colors }) {
  // letters = ["A","B"]
  // colors=["red","green"]
  //todo capitalize qu
  const blocks = letters.map((letter, index) => (
    <div key={index} className={colors[index]}>
      {letter}
    </div>
  ));

  return <div id="currentWord">{blocks}</div>;
}
