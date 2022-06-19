import React from "react";

export function Result({ boardIsFull, gameIsOver, dropToken }) {
  let resultText = "";
  if (boardIsFull) {
    if (gameIsOver) {
      resultText = "Complete!";
    } else {
      resultText = "Not all rows and columns are known words. Try again!";
    }
  }

  return (
    <div
      id="result"
      onDrop={(event) => dropToken({ event: event })}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {resultText}
    </div>
  );
}
