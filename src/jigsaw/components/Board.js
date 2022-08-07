import React from "react";
import { dragToken } from "./Jigsaw";
import { polyfill } from "mobile-drag-drop";

polyfill({
  dragImageCenterOnTouch: true,
});

export default function Board({
  pieces,
  handleBoardDragEnter,
  handleBoardDrop,
}) {
  // const boardPieces = pieces
  const boardPieces = pieces.filter(
    (piece) => piece.boardTop >= 0 && piece.boardLeft >= 0
  );

  const gridSize = 9; // todo get, and build grid smarter
  let grid = [
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null],
  ];

  for (let index = 0; index < boardPieces.length; index++) {
    const letters = boardPieces[index].letters;
    const id = boardPieces[index].id;
    let top = boardPieces[index].boardTop;
    for (let rowIndex = 0; rowIndex < letters.length; rowIndex++) {
      let left = boardPieces[index].boardLeft;
      for (let colIndex = 0; colIndex < letters[rowIndex].length; colIndex++) {
        if (letters[rowIndex][colIndex]) {
          grid[top][left] = {
            letter: letters[rowIndex][colIndex],
            relativeTop: rowIndex,
            relativeLeft: colIndex,
            pieceID: id,
          }; /// todo handle the case where something already there //todo handle case where off grid
        }
        left += 1;
      }
      top += 1;
    }
  }

  let boardElements = [];
  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      const element = grid[rowIndex][colIndex]?.letter ? (
        <div
          className="boardLetter"
          key={`${rowIndex}-${colIndex}`}
          draggable
          onDragStart={(event) => {
            // console.log("1! onDragStart board letter");
            dragToken({
              event: event,
              letter: grid[rowIndex][colIndex]?.letter,
              rowIndex: rowIndex,
              colIndex: colIndex,
              dragArea: "board",

              pieceID: grid[rowIndex][colIndex]?.pieceID,
              relativeTop: grid[rowIndex][colIndex]?.relativeTop,
              relativeLeft: grid[rowIndex][colIndex]?.relativeLeft,
            });
          }}
          onDrop={(event) => {
            // console.log("3b! onDrop board letter");
            handleBoardDrop({ event: event });
          }}
          onDragEnter={(event) => {
            // console.log("2! onDragEnter board letter");
            handleBoardDragEnter({
              event: event,
              rowIndex: rowIndex,
              colIndex: colIndex,
            });
          }}
          onDragEnd={(event) => {
            event.preventDefault();
            // console.log("3a onDragEnd board letter");
          }}
          // onDragEnter={(event)=> {
          //   event.preventDefault();
          // console.log("2 onDragEnter board letter");
          // }}
          onDragOver={(event) => {
            event.preventDefault();
            // console.log("onDragOver board letter");
          }}
          // onDragStart={(event)=> {
          //   // event.preventDefault();
          // console.log("1 onDragStart board letter");
          // }}
          // onDrop={(event)=> {
          //   event.preventDefault();
          // console.log("3b onDrop board letter");
          // }}
        >
          {grid[rowIndex][colIndex]?.letter}
        </div>
      ) : (
        <div
          className="boardLetter"
          key={`${rowIndex}-${colIndex}`}
          // onDragOver={(event) => {
          //   event.preventDefault();
          // }}
          onDrop={(event) => {
            // console.log("3b! onDrop board empty");
            handleBoardDrop({ event: event });
          }}
          // onDragEnd={()=> console.log("ondragend board b")}
          onDragEnter={(event) => {
            // console.log("2! onDragEnter board empty");
            handleBoardDragEnter({
              event: event,
              rowIndex: rowIndex,
              colIndex: colIndex,
            });
          }}
          onDragEnd={(event) => {
            event.preventDefault();
            // console.log("3a onDragEnd board empty");
          }}
          // onDragEnter={(event)=> {
          //   event.preventDefault();
          // console.log("2 onDragEnter board empty");
          // }}
          onDragOver={(event) => {
            event.preventDefault();
            // console.log("onDragOver board empty");
          }}
          onDragStart={(event) => {
            // event.preventDefault();
            // console.log("1 onDragStart board empty");
          }}
          // onDrop={(event)=> {
          //   event.preventDefault();
          // console.log("3b onDrop board empty");
          // }}
        >
          {""}
        </div>
      ); //todo make blank spaces draggable?
      boardElements.push(element);
    }
  }

  return <div id="board">{boardElements}</div>;
}
