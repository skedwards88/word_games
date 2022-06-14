import React from "react";
import { dragToken } from "./Packed";

function PoolLetter({ letterProperties, index }) {
  // todo todo not reactive to resize or rotation

  return (
    <div
      style={{
        top: `${letterProperties.yFractionalPosition}%`,
        left: `${letterProperties.xFractionalPosition}%`,
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
