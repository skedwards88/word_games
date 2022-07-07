import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
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
  event.target.classList.add('dragging')
}

function NGrid({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  // React.useEffect(() => {
  //   window.localStorage.setItem("ngridState", JSON.stringify(gameState));
  // }, [gameState]);

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

  // const boardIsFull = getBoardIsFull(gameState.board)
  // const gameIsOver = getGameOver(gameState.board)
  
  return (
    <div className="App" id="ngrid">
      <Board
        letters={gameState.board}
        dropToken={dropOnBoard}
      ></Board>
      {/* {boardIsFull ? (
        <Result boardIsFull={boardIsFull} gameIsOver={gameIsOver} dropToken={dropOnPool}></Result>
      ) : (
        <Pool pool={gameState.pool} dropToken={dropOnPool}></Pool>
      )} */}
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
          // disabled={gameIsOver}
          onClick={() => dispatchGameState({ action: "getHint" })}
        ></button>
        <Info
          info={
            <div>
              {<h1>NGrid</h1>}
              {`todo`}
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

export default NGrid;