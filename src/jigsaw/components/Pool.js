import React from "react";
import { dragPoolToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function Piece({ letters, pieceID }) {
  console.log(JSON.stringify(letters));
  let letterElements = [];
  for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
    for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
      let className = "poolLetter"
      if (letters[rowIndex][colIndex]) {
        if (!letters[rowIndex - 1]?.[colIndex]) {
          className = `${className} borderTop`
        }
        if (!letters[rowIndex + 1]?.[colIndex]) {
          className = `${className} borderBottom`
        }
        if (!letters[rowIndex][colIndex - 1]) {
          className = `${className} borderLeft`
        }
        if (!letters[rowIndex][colIndex + 1]) {
          className = `${className} borderRight`
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
        // console.log("1! onDragStart piece");
        dragPoolToken({
          event: event,
          letter: letters,
          pieceID: pieceID,
          dragArea: "pool",
        });
      }}
      // onDragOver={(event) => {
      //   event.preventDefault();
      // }}
      // onDragEnter={(event) => {
      //   event.preventDefault();
      // }}

      onDragEnd={(event) => {
        event.preventDefault();
        // console.log("3a onDragEnd piece");
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        // console.log("2 onDragEnter piece");
      }}
      onDragOver={(event) => {
        event.preventDefault();
        // console.log("onDragOver piece");
      }}
      onDrop={(event) => {
        event.preventDefault();
        // console.log("3b onDrop piece");
      }}
    >
      {letterElements}
    </div>
  );
}

export default function Pool({ pieces, dropOnPool }) {
  // const poolPieces = pieces.filter(piece => piece.location === "pool");
  const poolPieces = pieces.filter((piece) => piece.poolIndex >= 0); //todo order by index
  // const poolPieces = pieces
  poolPieces.sort((a, b) => a.poolIndex - b.poolIndex);

  const pieceElements = poolPieces.map((piece) =>
    Piece({ letters: piece.letters, pieceID: piece.id })
  );

  return (
    <div
      id="pool"
      onDrop={(event) => {
        // console.log("3 onDrop pool");
        dropOnPool({ event: event });
      }}
      // onDragOver={(event) => {
      //   event.preventDefault();
      // }}
      // onDragEnter={(event) => {
      //   event.preventDefault();
      // }}
      // onDragEnd={()=> console.log("ondragend pool")}

      onDragEnd={(event) => {
        event.preventDefault();
        // console.log("3a onDragEnd pool");
      }}
      onDragEnter={(event) => {
        event.preventDefault();
        // console.log("2 onDragEnter pool");
      }}
      onDragOver={(event) => {
        event.preventDefault();
        // console.log("onDragOver pool");
      }}
      // onDragStart={(event)=> {
      //   event.preventDefault();
      //   console.log("onDragStart pool");
      // }}
      // onDrop={(event)=> {
      //   event.preventDefault();
      //   console.log("3 onDrop pool");
      // }}
    >
      {pieceElements}
    </div>
  );
}
