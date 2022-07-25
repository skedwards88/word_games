import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Result from "./Result";
import Board from "./Board";
import Settings from "./Settings";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

export function dragToken({ event, letter, index, dragArea }) {
  console.log(JSON.stringify('in drag...'))
  event.dataTransfer.setData("dragIndex", `${index}`); // touch screen sets 0 as undefined, so convert to string
  event.dataTransfer.setData("dragArea", dragArea);
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
    const dropIndex = event.target.getAttribute("data-pool-position")
    console.log(`drop index: ${dropIndex}`)

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


    dispatchGameState({
      action: "dropOnBoard",
      dragIndex: dragIndex,
      dragArea: dragArea,
      dropX: event.clientX,
      dropY: event.clientY,
    });
  }

  return (
    <div className="App" id="jigsaw">
      <Board pieces={gameState.board} dropToken={dropOnBoard}></Board>
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
