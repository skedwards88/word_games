import React from "react";
import { dragToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function Piece({letters, index}) {
  return (
    <div
      className="poolLetter"
      key={index}
      draggable="true"
      data-pool-position={index}
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: letters,
          index: index,
          dragArea: "pool",
        })
      }
      onDragEnd={(event) => event.target.classList.remove("dragging")}
    >
      {letters.map((letter, index) => <div key={index}>{letter}</div>)}
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
