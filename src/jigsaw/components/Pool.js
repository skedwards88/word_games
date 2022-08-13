import React from "react";
import { dragPoolToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function Piece({ letters, pieceID }) {
  let letterElements = [];
  for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
    for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
      let className = "poolLetter";
      if (letters[rowIndex][colIndex]) {
        if (!letters[rowIndex - 1]?.[colIndex]) {
          className = `${className} borderTop`;
        }
        if (!letters[rowIndex + 1]?.[colIndex]) {
          className = `${className} borderBottom`;
        }
        if (!letters[rowIndex][colIndex - 1]) {
          className = `${className} borderLeft`;
        }
        if (!letters[rowIndex][colIndex + 1]) {
          className = `${className} borderRight`;
        }
      }
      const letterElement = (
        <div
          key={`${pieceID}-${rowIndex}-${colIndex}`}
          data-piece-id={pieceID}
          className={className}
        >
          {letters[rowIndex][colIndex]}
        </div>
      );
      letterElements.push(letterElement);
    }
  }
  return (
    <div
      className="poolPiece"
      key={pieceID}
      style={{
        "--numRows": `${letters.length}`,
        "--numCols": `${letters[0].length}`,
      }}
      draggable="true"
      data-piece-id={pieceID}
      onDragStart={(event) => {
        dragPoolToken({
          event: event,
          letter: letters,
          pieceID: pieceID,
          dragArea: "pool",
        });
      }}
      onDragEnd={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
      }}
    >
      {letterElements}
    </div>
  );
}

export default function Pool({ pieces, dropOnPool }) {
  const poolPieces = pieces.filter((piece) => piece.poolIndex >= 0); //todo order by index
  poolPieces.sort((a, b) => a.poolIndex - b.poolIndex);

  const pieceElements = poolPieces.map((piece) =>
    Piece({ letters: piece.letters, pieceID: piece.id })
  );

  return (
    <div
      id="pool"
      onDrop={(event) => {
        dropOnPool({ event: event });
      }}
      onDragEnd={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
      onDragOver={(event) => {
        event.preventDefault();
      }}
    >
      {pieceElements}
    </div>
  );
}
