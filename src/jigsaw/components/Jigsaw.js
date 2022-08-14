import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Result from "./Result";
import Board from "./Board";
import Settings from "./Settings";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

export function newDrag({event, pieceID}) {
  event.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
  event.dataTransfer.setData("pieceID", `${pieceID}`);

}

export function dragToken({
  event,
  dragArea,
  pieceID,
  relativeTop,
  relativeLeft,
}) {
  console.log("drag board");

  event.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("pieceID", `${pieceID}`);
  event.dataTransfer.setData("relativeTop", relativeTop);
  event.dataTransfer.setData("relativeLeft", relativeLeft);
}

export function dragPoolToken({ event, pieceID, dragArea,
  relativeTop,
  relativeLeft, }) {
    console.log('drag pool')
  event.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
  event.dataTransfer.setData("pieceID", `${pieceID}`);
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("relativeTop", relativeTop);
  event.dataTransfer.setData("relativeLeft", relativeLeft);

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

    dispatchGameState({
      action: "dropOnPool",
      pieceID: pieceID,
      dragArea: dragArea,
      targetPieceID: targetPieceID,
    });
  }

  function handleBoardDrop({ event }) {
    console.log("drop on board");

    event.preventDefault();
    const dragArea = event.dataTransfer.t.data.dragArea;
    const pieceID = event.dataTransfer.t.data.pieceID;

    dispatchGameState({
      action: "dropOnBoard",
      dragArea: dragArea,
      pieceID: pieceID,
    });
  }

  function handlePoolDragEnter({event}) {
    console.log('drag pool enter')
    event.preventDefault();
    const pieceID = event.dataTransfer.t.data.pieceID;
    const dragArea = event.dataTransfer.t.data.dragArea;

    // const pieceID = event.dataTransfer.getData("pieceID");
    // const dragArea = event.dataTransfer.getData("dragArea");
    const targetPieceID = event.target.getAttribute("data-piece-id");

    dispatchGameState({
      action: "dropOnPool",
      pieceID: pieceID,
      dragArea: dragArea,
      targetPieceID: targetPieceID,
    });
  }

  function handleBoardDragEnter({ event, rowIndex, colIndex }) {
    console.log('drag board enter')
    event.preventDefault();
    console.log(event.dataTransfer.types)
    const pieceID = event.dataTransfer.t.data.pieceID;
    const relativeTop = event.dataTransfer.t.data.relativeTop;
    const relativeLeft = event.dataTransfer.t.data.relativeLeft;
    const dragArea = event.dataTransfer.t.data.dragArea;

    dispatchGameState({
      action: "dragOverBoard",
      pieceID: pieceID,
      relativeTop: relativeTop,
      relativeLeft: relativeLeft,
      dropRowIndex: rowIndex,
      dropColIndex: colIndex,
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
      <Pool pieces={gameState.pieces} dropOnPool={dropOnPool} handlePoolDragEnter={handlePoolDragEnter}></Pool>

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
              {`You discovered a new game! It's still under development. Feel free to play around, and be sure to come back once all features are in place.`}
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
