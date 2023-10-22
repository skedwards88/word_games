import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Board from "./Board";
import Settings from "./Settings";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

export function dragToken({ event, letter, index, dragArea }) {
  event.dataTransfer.setData("dragIndex", `${index}`); // touch screen sets 0 as undefined, so convert to string
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("width", event.target.clientWidth);
  event.dataTransfer.setData("height", event.target.clientHeight);
  event.target.classList.add("dragging");
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
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const dragArea = event.dataTransfer.getData("dragArea");
    const dropIndex = event.target.getAttribute("data-pool-position");

    dispatchGameState({
      action: "dropOnPool",
      dragIndex: dragIndex,
      dragArea: dragArea,
      dropIndex: dropIndex,
    });
  }

  function dropOnBoard({ event }) {
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const dragArea = event.dataTransfer.getData("dragArea");
    const width = event.dataTransfer.getData("width");
    const height = event.dataTransfer.getData("height");

    // Don't use event.target since you can drop on board, piece, or letter
    const boardElement = document.getElementById("board")
    const boardWidth = boardElement.offsetWidth
    const boardHeight = boardElement.offsetHeight
    const boardLeft = boardElement.offsetLeft
    const boardTop = boardElement.offsetTop

    dispatchGameState({
      action: "dropOnBoard",
      dragIndex: dragIndex,
      dragArea: dragArea,
      dropX: event.clientX  - width / 2,
      dropY: event.clientY - height / 2,
      pieceWidth: width,
      pieceHeight: height,
      boardWidth: boardWidth,
      boardHeight: boardHeight,
      boardLeft: boardLeft,
      boardTop: boardTop,
    });
  }

  return (
    <div className="App" id="jigsaw">
      <Board pieces={gameState.board} dropToken={dropOnBoard}></Board>
      <Pool pool={gameState.pool} dropToken={dropOnPool}></Pool>

      <div id="controls">
        <button
          id="newGameButton"
          onClick={() => {
            dispatchGameState({
              action: "newGame",
              gridSize: Math.sqrt(gameState.board.length),
            });
          }}
        ></button>
        <button
          id="helpButton"
          disabled={!gameState.pool.length}
          onClick={() => dispatchGameState({ action: "getHint" })}
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
