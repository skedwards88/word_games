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
  event.dataTransfer.setData("dragIndex", `${index}`); // touch screen set 0 as undefinde
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("width", event.target.clientWidth);
  event.dataTransfer.setData("height", event.target.clientHeight);
}

function Packed({ setCurrentDisplay }) {
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
    <div className="App" id="packed">
      <Board
        letters={gameState.board}
        locked={gameState.locked}
        dropToken={dropOnBoard}
      ></Board>
      {!gameState.board.some((i) => !i) ? (
        <Result board={gameState.board}></Result>
      ) : (
        <Pool pool={gameState.pool} dropToken={dropOnPool}></Pool>
      )}

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
              {<h1>Packed</h1>}
              {`Arrange the letters to make every column and every row a word`}
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

export default Packed;
