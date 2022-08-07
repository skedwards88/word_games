import React from "react";
import { dragPoolToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

function Piece({ letters, pieceID }) {
  return (
    <div
      className="poolLetter"
      key={pieceID}
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
      {letters
        .flatMap((i) => i)
        .map((letter, index) => (
          <div key={index} data-piece-id={pieceID}>
            {letter}
          </div>
        ))}
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
