import React from "react";
import {dragToken} from "./Packed";
import {polyfill} from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

export default function Board({letters, locked, dropToken}) {
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
      onDragEnd={(event) => event.target.classList.remove("dragging")}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => dropToken({event: event, index: index})}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {letter}
    </div>
  ));
  return (
    <div id="board" className={`size_${letters.length}`}>
      {board}
    </div>
  );
}
