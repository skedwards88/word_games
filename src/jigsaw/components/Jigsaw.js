import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Result from "./Result";
import Board from "./Board";
import Settings from "./Settings";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";
import { Link } from "react-router-dom";

function Jigsaw() {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  React.useEffect(() => {
    window.localStorage.setItem("jigsawState", JSON.stringify(gameState));
  }, [gameState]);

  function dragToken({
    event,
    dragArea,
    pieceID,
    relativeTop,
    relativeLeft,
    boardTop,
    boardLeft,
  }) {
    event.dataTransfer.setDragImage(document.createElement("img"), 0, 0);
    event.dataTransfer.setData(
      "draggedElementID",
      event.target.parentElement.id
    );
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

  function dropOnPool({ event, targetPieceID }) {
    // Can drop on a pool piece or an empty section of the pool,
    // so prevent bubbling up so that this handler doesn't execute twice
    // when drop on a pool piece
    event.stopPropagation();

    event.preventDefault();

    document
      .getElementById(event.dataTransfer.getData("draggedElementID"))
      .classList.remove("dragging");

    dispatchGameState({
      action: "dropOnPool",
      targetPieceID: targetPieceID,
    });
  }

  function handleBoardDrop({ event, rowIndex, colIndex }) {
    event.preventDefault();
    document
      .getElementById(event.dataTransfer.getData("draggedElementID"))
      .classList.remove("dragging");

    dispatchGameState({
      action: "dropOnBoard",
      dropRowIndex: rowIndex,
      dropColIndex: colIndex,
    });
  }

  function handlePoolDragEnter({ event, targetPieceID }) {
    // Can drop on a pool piece or an empty section of the pool,
    // so prevent bubbling up so that this handler doesn't execute twice
    // when drop on a pool piece
    event.stopPropagation();

    event.preventDefault();
    dispatchGameState({
      action: "dragOverPool",
      targetPieceID: targetPieceID,
    });
  }

  function handleBoardDragEnter({ event, rowIndex, colIndex }) {
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
      {gameState.pieces.filter((piece) => piece.poolIndex >= 0).length ? (
        <Pool
          pieces={gameState.pieces}
          dropOnPool={dropOnPool}
          handlePoolDragEnter={handlePoolDragEnter}
          dragToken={dragToken}
        ></Pool>
      ) : (
        <Result
          pieces={gameState.pieces}
          gridSize={gameState.gridSize}
          dropToken={dropOnPool}
        ></Result>
      )}

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
        <button
          id="helpButton"
          // disabled={!gameState.pool.length} todo
          onClick={() => dispatchGameState({ action: "getHint" })}
        ></button>
        <Settings dispatchGameState={dispatchGameState} gameState={gameState} />
        <Info
          info={
            <div>
              {<h1>Jigsaw</h1>}
              {`Arrange the pieces to make words vertically and horizontally. All words must connect.\n\nDrag a blank space to move the whole puzzle.`}
            </div>
          }
        ></Info>
        <Link to={`/`} id="homeButton"></Link>
      </div>
    </div>
  );
}

export default Jigsaw;
