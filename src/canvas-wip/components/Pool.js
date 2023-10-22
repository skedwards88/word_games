import React from "react";
import { dragToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function CanvasPiece({ letters, index }) {

  return <canvas
    id="canvas"
    width="900px" //todo how to handle size when multiple pieces locked
    height="900px"
    key={index}
    draggable
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
  ></canvas>
}

function Piece({ letters, index }) {
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
      {letters.map((letter, index) => (
        <div key={index}>{letter}</div>
      ))}
    </div>
  );
}

export default function Pool({ pool, dropToken }) {

  const myRef = React.useRef();

  React.useLayoutEffect(() => {
    console.log('in use effect')
    const canvases = myRef.current.children
    console.log(`num canvases: ${canvases.length}`)
    for (let index = 0; index < canvases.length; index++) {
      const canvasElement= canvases[index];
      const context = canvasElement.getContext('2d');
      context.clearRect(0, 0, canvasElement.width, canvasElement.height)
      context.textBaseline = "middle";
      context.font = '300px sans-serif';
      context.textAlign = "center";

      const letters = pool[index];
      console.log(`num pieces: ${pool.length}`)
      console.log(`on ${index}, ${letters}`)
      console.log(JSON.stringify(letters))
      for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
        for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
          if (letters[rowIndex][colIndex]) {
            const x = 150 + (300 * colIndex);
            const y = 150 + (300 * rowIndex);
            context.fillStyle = "#00ff00";
            context.fillRect(x - 150, y - 150, 300, 300);

            context.fillStyle = "#0000ff";
            context.fillText(letters[rowIndex][colIndex], x, y);

          }
        }
      }
    }
  },[pool])

  const pieces = pool.map((letters, index) =>
  CanvasPiece({ letters: letters, index: index })
  );

  return (
    <div
      id="pool"
      ref={myRef}
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
