import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Result from "./Result";
import Board from "./Board";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

export function dragToken({ event, letter, index, dragArea }) {
  event.dataTransfer.setData("letter", letter);
  event.dataTransfer.setData("dragIndex", `${index}`); // touch screen sets 0 as undefined, so convert to string
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("width", event.target.clientWidth);
  event.dataTransfer.setData("height", event.target.clientHeight);
  event.target.classList.add("dragging");
}

function Crossle({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  React.useEffect(() => {
    window.localStorage.setItem("crossleState", JSON.stringify(gameState));
  }, [gameState]);

  function dropOnPool({ event }) {
    const letter = event.dataTransfer.getData("letter");
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const dragArea = event.dataTransfer.getData("dragArea");
    const width = event.dataTransfer.getData("width");
    const height = event.dataTransfer.getData("height");

    // If you drop on another letter in the pool, that letter is considered the target
    // So we need to make sure to get the parent dimensions instead of the target dimensions in that case
    // in order to later calculate the position relative to the pool
    let poolStats = {};
    if (event.target.id === "pool") {
      poolStats = {
        poolWidth: event.target.offsetWidth,
        poolHeight: event.target.offsetHeight,
        poolLeft: event.target.offsetLeft,
        poolTop: event.target.offsetTop,
      };
    } else {
      poolStats = {
        poolWidth: event.target.parentElement.offsetWidth,
        poolHeight: event.target.parentElement.offsetHeight,
        poolLeft: event.target.parentElement.offsetLeft,
        poolTop: event.target.parentElement.offsetTop,
      };
    }

    dispatchGameState({
      action: "dropOnPool",
      letter: letter,
      dragIndex: dragIndex,
      dragArea: dragArea,
      dropX: event.clientX - width / 2,
      dropY: event.clientY - height / 2,
      ...poolStats,
    });
  }

  function dropOnBoard({ event, index }) {
    const letter = event.dataTransfer.getData("letter");
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const dragArea = event.dataTransfer.getData("dragArea");

    dispatchGameState({
      action: "dropOnBoard",
      dropIndex: index,
      letter: letter,
      dragIndex: dragIndex,
      dragArea: dragArea,
      dropX: event.clientX,
      dropY: event.clientY,
    });
  }

  return (
    <div className="App" id="crossle">
      <Board letters={gameState.board} dropToken={dropOnBoard}></Board>
      {gameState.pool.length ? (
        <Pool pool={gameState.pool} dropToken={dropOnPool}></Pool>
      ) : (
        <Result board={gameState.board} dropToken={dropOnPool}></Result>
      )}

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
        <Info
          info={
            <div>
              {<h1>Crossle</h1>}
              {`Arrange the letters to make words vertically and horizontally. All words must connect.`}
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

export default Crossle;
