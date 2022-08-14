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
  gridSize,
}) {
  const boardPieces = pieces.filter(
    (piece) => piece.boardTop >= 0 && piece.boardLeft >= 0
  );

  let grid = JSON.parse(
    JSON.stringify(Array(gridSize).fill(Array(gridSize).fill("")))
  );

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
            borderTop: !Boolean(letters[rowIndex - 1]?.[colIndex]),
            borderBottom: !Boolean(letters[rowIndex + 1]?.[colIndex]),
            borderLeft: !Boolean(letters[rowIndex][colIndex - 1]),
            borderRight: !Boolean(letters[rowIndex][colIndex + 1]),
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
          className={`boardLetter${
            grid[rowIndex][colIndex].borderTop ? " borderTop" : ""
          }${grid[rowIndex][colIndex].borderBottom ? " borderBottom" : ""}${
            grid[rowIndex][colIndex].borderLeft ? " borderLeft" : ""
          }${grid[rowIndex][colIndex].borderRight ? " borderRight" : ""}`}
          key={`${rowIndex}-${colIndex}`}
          draggable
          onDragStart={(event) => {

            dragToken({
              event: event,
              dragArea: "board",

              pieceID: grid[rowIndex][colIndex]?.pieceID,
              relativeTop: grid[rowIndex][colIndex]?.relativeTop,
              relativeLeft: grid[rowIndex][colIndex]?.relativeLeft,
            });
          }}
          onDrop={(event) => {
            event.preventDefault();
            handleBoardDrop({ event: event });
          }}
          onDragEnter={(event) => {
            event.preventDefault();
            handleBoardDragEnter({
              event: event,
              rowIndex: rowIndex,
              colIndex: colIndex,
            });
          }}
          onDragEnd={(event) => {
            event.preventDefault();
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
        >
          {grid[rowIndex][colIndex]?.letter}
        </div>
      ) : (
        <div
          className="boardLetter"
          key={`${rowIndex}-${colIndex}`}
          onDrop={(event) => {
            event.preventDefault();

            handleBoardDrop({ event: event });
          }}
          onDragEnter={(event) => {
            event.preventDefault();

            handleBoardDragEnter({
              event: event,
              rowIndex: rowIndex,
              colIndex: colIndex,
            });
          }}
          onDragEnd={(event) => {
            event.preventDefault();
          }}
          onDragOver={(event) => {
            event.preventDefault();
          }}
          onDragStart={(event) => {}}
        >
          {""}
        </div>
      ); //todo make blank spaces draggable?
      boardElements.push(element);
    }
  }

  return <div id="board">{boardElements}</div>;
}
