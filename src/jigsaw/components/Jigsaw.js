import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Result from "./Result";
import Board from "./Board";
import Settings from "./Settings";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

function Jigsaw({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  React.useEffect(() => {
    window.localStorage.setItem("jigsawState", JSON.stringify(gameState));
  }, [gameState]);

  function dragToken({ event, dragArea, pieceID, relativeTop, relativeLeft, boardTop, boardLeft }) {
    event.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
    event.dataTransfer.setData("draggedElementID", event.target.parentElement.id)
    if (dragArea === "pool") {
      event.target.parentElement.classList.add("dragging");
    }
    dispatchGameState({
      action: "startDrag",
      pieceID: pieceID,
      dragArea: dragArea,
      relativeTop: relativeTop,
      relativeLeft: relativeLeft,
      boardLeft: boardLeft,
      boardTop: boardTop,
    });
  }

  function dropOnPool({ event }) {
    event.preventDefault();
    console.log("drop on pool");
    const targetPieceID = event.target.getAttribute("data-piece-id");

    document.getElementById(event.dataTransfer.getData("draggedElementID")).classList.remove("dragging")

    dispatchGameState({
      action: "dropOnPool",
      targetPieceID: targetPieceID,
    });
  }

  function handleBoardDrop({ event, rowIndex, colIndex }) {
    event.preventDefault();
    console.log("drop on board");
    document.getElementById(event.dataTransfer.getData("draggedElementID")).classList.remove("dragging")

    dispatchGameState({
      action: "dropOnBoard",
      dropRowIndex: rowIndex,
      dropColIndex: colIndex,
    });
  }

  function handlePoolDragEnter({ event }) {
    console.log("drag pool enter");
    event.preventDefault();
    const targetPieceID = event.target.getAttribute("data-piece-id");

    dispatchGameState({
      action: "dragOverPool",
      targetPieceID: targetPieceID,
    });
  }

  function handleBoardDragEnter({ event, rowIndex, colIndex }) {
    console.log("drag board enter");
    event.preventDefault();

    dispatchGameState({
      action: "dragOverBoard",
      dropRowIndex: rowIndex,
      dropColIndex: colIndex,
    });
  }

  return (
    <div className="App" id="jigsaw">
      <Board
        pieces={gameState.pieces}
        handleBoardDragEnter={handleBoardDragEnter}
        handleBoardDrop={handleBoardDrop}
        gridSize={gameState.gridSize}
        dragToken={dragToken}
      ></Board>
      {gameState.pieces.filter((piece) => piece.poolIndex >= 0).length ? <Pool
        pieces={gameState.pieces}
        dropOnPool={dropOnPool}
        handlePoolDragEnter={handlePoolDragEnter}
        dragToken={dragToken}
      ></Pool> : <Result pieces={gameState.pieces} gridSize={gameState.gridSize} dropToken={dropOnPool}></Result>}
      
      

      <div id="controls">
        <button
          id="newGameButton"
          onClick={() => {
            dispatchGameState({
              ...gameState,
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
