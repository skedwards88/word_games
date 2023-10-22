import React from "react";
import { dragToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function CanvasPiece({ letters, index,x, y,  }) {

  return <canvas
    id="boardCanvas"// changed
    width="900px" //todo how to handle size when multiple pieces locked
    height="900px"
    key={index}
    draggable
    // data-pool-position={index} // -> removed
        style={{ // added
        "--x": `${x}%`,
        "--y": `${y}%`,
      }}
    onDragStart={(event) =>
      dragToken({
        event: event,
        letter: letters,
        index: index,
        dragArea: "board", // -> changed
      })
    }
    onDragEnd={(event) => event.target.classList.remove("dragging")}
  ></canvas>
}

export default function Board({ pieces, dropToken }) {
  
  const myRef = React.useRef();
  
  React.useEffect(() => {
    const canvases = myRef.current.children
    for (let index = 0; index < canvases.length; index++) {
      const canvasElement= canvases[index];
      const context = canvasElement.getContext('2d');
      context.textBaseline = "middle";
      context.font = '300px sans-serif';
      context.fillStyle = "#ffffff";
      context.textAlign = "center";

      const letters = pieces[index].letters;
      for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
        for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
          if (letters[rowIndex][colIndex]) {
            const x = 150 + (300 * colIndex)
            const y = 150 + (300 * rowIndex)
            context.fillStyle = "#00ff00";
            context.fillRect(x - 150, y - 150, 300, 300);

            context.fillStyle = "#0000ff";
            context.fillText(letters[rowIndex][colIndex], x, y);
          }
        }
      }
    }
  },[pieces])

  const board = pieces.map((piece, index) =>
  CanvasPiece({ letters: piece.letters, x: piece.x, y: piece.y, index: index })
  );

  return (
    <div
      id="board"
      ref={myRef}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => dropToken({ event: event })}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {board}
    </div>
  );
}
