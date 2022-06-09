import React from "react";
import { dragToken } from "./TwoD";

export default function Board({ letters, locked, dropToken }) {
  const board = letters.map((letter, index) => (
    <div
      className={locked[index] ? "boardLetter locked" : "boardLetter"}
      key={index}
      draggable={!locked[index]}
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: letter,
          index: index,
          dragArea: "board",
        })
      }
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => dropToken({ event: event, index: index })}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {letter}
    </div>
  ));
  return <div id="board">{board}</div>;
}
