import React from "react";
import { dragToken } from "./TwoD";

export default function Pool({ pool, dropToken }) {
  let letters = [];
  // todo calc offset adj
  for (let index = 0; index < pool.length; index++) {
    let xPosition;
    if (pool[index].xPosition) {
      xPosition = pool[index].xPosition;
    } else if (typeof pool[index].xOffsetFactor === "number") {
      xPosition = `${pool[index].xOffsetFactor * 8 + 50}vw`;
    } else {
      console.log("todo error or have safe fallback?");
    }

    let yPosition;
    if (pool[index].yPosition) {
      yPosition = pool[index].yPosition;
    } else if (typeof pool[index].yOffsetFactor === "number") {
      yPosition = `${pool[index].yOffsetFactor * 8 + 70}vh`;
    } else {
      console.log("todo error or have safe fallback?");
    }

    letters.push(
      <div
        style={{ top: yPosition, left: xPosition }}
        className="poolLetter"
        key={index}
        draggable="true"
        onDragStart={(event) =>
          dragToken({
            event: event,
            letter: pool[index].letter,
            index: index,
            dragArea: "pool",
          })
        }
      >
        {pool[index].letter}
      </div>
    );
  }

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
