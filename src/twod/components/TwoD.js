import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Board from "./Board";
import { Result } from "./Result";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

export function dragToken({ event, letter, index, dragArea }) {
  event.dataTransfer.setData("letter", letter);
  event.dataTransfer.setData("dragIndex", index);
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("width", event.target.clientWidth);
  event.dataTransfer.setData("height", event.target.clientHeight);

  // If not on a device on which the mobile-drag-drop pollyfill applies,
  // center the drag image on the cursor
  // if (!/iPad|iPhone|iPod|Android/.test(navigator.userAgent)) {
  //   event.dataTransfer.setDragImage(event.target, 50, 50);
  // }
}

function TwoD({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  function dropOnPool({ event }) {
    const letter = event.dataTransfer.getData("letter");
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const dragArea = event.dataTransfer.getData("dragArea");
    const width = event.dataTransfer.getData("width");
    const height = event.dataTransfer.getData("height");

    dispatchGameState({
      action: "dropOnPool",
      letter: letter,
      dragIndex: dragIndex,
      dragArea: dragArea,
      dropX: event.clientX - width / 2,
      dropY: event.clientY - height / 2,
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

  React.useEffect(() => {
    //todo set local storage
  }, [gameState]);

  return (
    <div className="App" id="twod">
      <Result board={gameState.board}></Result>
      <Board
        letters={gameState.board}
        locked={gameState.locked}
        dropToken={dropOnBoard}
      ></Board>
      <Pool pool={gameState.pool} dropToken={dropOnPool}></Pool>
      <div id="controls">
        <button
          id="newGameButton"
          onClick={() => {
            dispatchGameState({
              action: "newGame",
              gridSize: gameState.solution.length,
            });
          }}
        ></button>
        <button
          id="helpButton"
          onClick={() => dispatchGameState({ action: "getHint" })}
        ></button>
        <Info
          info={
            <div>
              {<h1>TwoD</h1>}
              {`TODO`}
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

export default TwoD;
