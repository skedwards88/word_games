import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Result from "./Result";
import Board from "./Board";
import Settings from "./Settings";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

export function dragToken({
  event,
  letter,
  rowIndex,
  colIndex,
  dragArea,
  pieceID,
  relativeTop,
  relativeLeft,
}) {
  event.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
  event.dataTransfer.setData("letter", letter);
  event.dataTransfer.setData("dragRowIndex", `${rowIndex}`); // touch screen sets 0 as undefined, so convert to string //todo for other ints
  event.dataTransfer.setData("dragColIndex", `${colIndex}`); // touch screen sets 0 as undefined, so convert to string //todo for other ints
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("width", event.target.clientWidth);
  event.dataTransfer.setData("height", event.target.clientHeight);

  event.dataTransfer.setData("pieceID", `${pieceID}`);
  event.dataTransfer.setData("relativeTop", relativeTop);
  event.dataTransfer.setData("relativeLeft", relativeLeft);
}

export function dragPoolToken({ event, letter, pieceID, dragArea }) {
  event.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
  event.dataTransfer.setData("letter", letter);
  event.dataTransfer.setData("pieceID", `${pieceID}`);
  event.dataTransfer.setData("dragArea", dragArea);
}

function Jigsaw({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  React.useEffect(() => {
    window.localStorage.setItem("jigsawState", JSON.stringify(gameState));
  }, [gameState]);

  function dropOnPool({ event }) {
    event.preventDefault();
    console.log("drop on pool");
    const pieceID = event.dataTransfer.getData("pieceID");
    const dragArea = event.dataTransfer.getData("dragArea");
    const targetPieceID = event.target.getAttribute("data-piece-id");

    console.log(event.target);

    dispatchGameState({
      action: "dropOnPool",
      pieceID: pieceID,
      dragArea: dragArea,
      targetPieceID: targetPieceID,
    });
  }

  function handleBoardDrop({ event }) {
    event.preventDefault();
    const dragArea = event.dataTransfer.t.data.dragArea;
    const pieceID = event.dataTransfer.t.data.pieceID;

    dispatchGameState({
      action: "dropOnBoard",
      dragArea: dragArea,
      pieceID: pieceID,
    });
  }

  function handleBoardDragEnter({ event, rowIndex, colIndex }) {
    event.preventDefault();
    const pieceID = event.dataTransfer.t.data.pieceID;
    const relativeTop = event.dataTransfer.t.data.relativeTop;
    const relativeLeft = event.dataTransfer.t.data.relativeLeft;
    const dragRowIndex = event.dataTransfer.t.data.dragRowIndex;
    const dragColIndex = event.dataTransfer.t.data.dragColIndex;
    const dragArea = event.dataTransfer.t.data.dragArea;

    dispatchGameState({
      action: "dragOverBoard",
      pieceID: pieceID,
      relativeTop: relativeTop,
      relativeLeft: relativeLeft,
      dropRowIndex: rowIndex,
      dropColIndex: colIndex,
      dragRowIndex: dragRowIndex,
      dragColIndex: dragColIndex,
      dragArea: dragArea,
    });
  }

  return (
    <div className="App" id="jigsaw">
      <Board
        pieces={gameState.pieces}
        handleBoardDragEnter={handleBoardDragEnter}
        handleBoardDrop={handleBoardDrop}
        gridSize={gameState.gridSize}
      ></Board>
      <Pool pieces={gameState.pieces} dropOnPool={dropOnPool}></Pool>

      <div id="controls">
        <button
          id="newGameButton"
          onClick={() => {
            dispatchGameState({
              action: "newGame",
            });
          }}
        ></button>
        <Settings dispatchGameState={dispatchGameState} gameState={gameState} />
        <Info
          info={
            <div>
              {<h1>Jigsaw</h1>}
              {`Arrange the letters to make words vertically and horizontally. All words must connect.\n\nDrag a blank space to move all of the words.`}
            </div>
          }
        ></Info>
        <button
          id="homeButton"
          onClick={() => setCurrentDisplay(gameIndex.Home)}
        ></button>
      </div>
    </div>
  );
}

export default Jigsaw;
