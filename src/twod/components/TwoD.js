import React from "react";
import Info from "../../common/Info";
// import Board from "./Board";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

function dragToken({ event, letter, index, dragArea }) {
  console.log("start drag");
  event.dataTransfer.setData("letter", letter);
  event.dataTransfer.setData("dragIndex", index);
  event.dataTransfer.setData("dragArea", dragArea);

  // If not on a device on which the mobile-drag-drop pollyfill applies,
  // center the drag image on the cursor
  if (!/iPad|iPhone|iPod|Android/.test(navigator.userAgent)) {
    event.dataTransfer.setDragImage(event.target, 50, 50);
  }
}

function Pool({ letters, dropToken }) {
  const pool = letters.map((letter, index) => (
    <div
      className="poolLetter"
      key={index}
      draggable="true"
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: letter,
          index: index,
          dragArea: "pool",
        })
      }
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) =>
        dropToken({ event: event, index: index, dropArea: "pool" })
      }
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {letter}
    </div>
  ));
  return <div id="pool">{pool}</div>;
}

function Board({ letters, dropToken }) {
  const board = letters.map((letter, index) => (
    <div
      className="boardLetter"
      key={index}
      draggable="true"
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: letter,
          index: index,
          dragArea: "board",
        })
      }
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDrop={(event) =>
        dropToken({ event: event, index: index, dropArea: "board" })
      }
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {letter}
    </div>
  ));
  return <div id="board">{board}</div>;
}

function TwoD({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  function dropToken({ event, index, dropArea }) {
    const letter = event.dataTransfer.getData("letter");
    const dragIndex = event.dataTransfer.getData("dragIndex");
    const dragArea = event.dataTransfer.getData("dragArea");
    dispatchGameState({
      action: "droppedLetter",
      dropIndex: index,
      dropArea: dropArea,
      letter: letter,
      dragIndex: dragIndex,
      dragArea: dragArea,
    });
  }

  React.useEffect(() => {
    //todo set local storage
  }, [gameState]);

  console.log(gameState.pool);
  return (
    <div className="App" id="twod">
      <div></div>

      <Board letters={gameState.board} dropToken={dropToken}></Board>
      <Pool letters={gameState.pool} dropToken={dropToken}></Pool>
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
          onClick={() => dispatchGameState({ action: "giveUp" })}
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
