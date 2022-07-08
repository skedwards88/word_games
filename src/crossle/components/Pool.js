import React from "react";
import { dragToken } from "./Crossle";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function PoolLetter({ letterProperties, index }) {
  return (
    <div
      style={{
        "--y": `${letterProperties.yFractionalPosition}%`,
        "--x": `${letterProperties.xFractionalPosition}%`,
      }}
      className="poolLetter"
      key={index}
      draggable="true"
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: letterProperties.letter,
          index: index,
          dragArea: "pool",
        })
      }
      onDragEnd={(event) => event.target.classList.remove("dragging")}
    >
      {letterProperties.letter}
    </div>
  );
}

export default function Pool({ pool, dropToken }) {
  let letters = [];

  letters = pool.map((letterProperties, index) =>
    PoolLetter({ letterProperties: letterProperties, index: index })
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
      {letters}
    </div>
  );
}
