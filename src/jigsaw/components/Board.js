import React from "react";
import { dragToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

export default function Board({ letters, dropToken }) {
  const board = letters.map((letter, index) => (
    <div
      className="boardLetter"
      key={index}
      draggable
      onDoubleClick={(event) => console.log("double")}
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: letter,
          index: index,
          dragArea: "board",
        })
      }
      onDragEnd={(event) => event.target.classList.remove("dragging")}
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
