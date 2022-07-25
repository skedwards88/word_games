import React from "react";
import { dragToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

export default function Board({ pieces, dropToken }) {
  const board = pieces.map((piece, index) => (
    <div
      className="boardLetter"
      key={index}
      draggable
      style={{
        "--x": `${piece.x}px`,
        "--y": `${piece.y}px`,
      }}
      onDoubleClick={(event) => console.log("double")}
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: piece.letters,
          index: index,
          dragArea: "board",
        })
      }
      onDragEnd={(event) => event.target.classList.remove("dragging")}

    >
      {piece.letters.map((letter, index) => <div key={index}>{letter}</div>)}
    </div>
  ));
  return <div id="board"
  onDragOver={(event) => {
    event.preventDefault();
  }}
  onDrop={(event) => dropToken({ event: event })}
  onDragEnter={(event) => {
    event.preventDefault();
  }}
  >{board}</div>;
}
