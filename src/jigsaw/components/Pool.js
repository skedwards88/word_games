import React from "react";
import { dragPoolToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function Piece({ letters, index }) {
  return (
    <div
      className="poolLetter"
      key={index}
      draggable="true"
      data-pool-position={index}
      onDragStart={(event) =>
        dragPoolToken({
          event: event,
          letter: letters,
          dragIndex: index,
          dragArea: "pool",
        })
      }
    >
      {letters.flatMap(i=>i).map((letter, index) => (
        <div key={index}>{letter}</div>
      ))}
    </div>
  );
}

export default function Pool({ pool, dropToken }) {
  const pieces = pool.map((letters, index) =>
    Piece({ letters: letters, index: index })
  );

  return (
    <div
      id="pool"
      onDrop={(event) => dropToken({ event: event })}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {pieces}
    </div>
  );
}
