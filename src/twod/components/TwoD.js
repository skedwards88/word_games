import React from "react";
import Info from "../../common/Info";
// import Board from "./Board";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";
import { isKnown } from "../../common/isKnown";

function dragToken({ event, letter, index, dragArea }) {
  console.log(event);

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

function Pool({ pool, dropToken }) {
  const letters = pool.map((obj, index) => (
    <div
      style={{ top: obj.y, left: obj.x }}
      className="poolLetter"
      key={index}
      draggable="true"
      onDragStart={(event) =>
        dragToken({
          event: event,
          letter: obj.letter,
          index: index,
          dragArea: "pool",
        })
      }
    >
      {obj.letter}
    </div>
  ));
  return (
    <div
      id="pool"
      onDrop={(event) => dropToken({ event: event })}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={(event) => {
        event.preventDefault();
      }}
    >
      {letters}
    </div>
  );
}

function Board({ letters, locked, dropToken }) {
  const board = letters.map((letter, index) => (
    <div
      className={locked[index] ? "boardLetter locked" : "boardLetter"}
      key={index}
      draggable={!locked[index]}
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
      onDrop={(event) => dropToken({ event: event, index: index })}
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

  function partitionArray(array, partitionSize) {
    let partitioned = [];
    for (let i = 0; i < array.length; i += partitionSize) {
      partitioned.push(array.slice(i, i + partitionSize));
    }
    return partitioned;
  }

  function getBoardIsFull(board) {
    return !board.some((i) => !i);
  }

  function getGameOver(board) {
    // If the board isn't full, return early
    if (!getBoardIsFull(board)) {
      return false;
    }

    // todo
    const rows = partitionArray(board, Math.sqrt(board.length));
    console.log(rows);
    for (let index = 0; index < rows.length; index += 1) {
      const { isWord } = isKnown(rows[index].join(""));
      if (!isWord) {
        console.log(`unknown ${rows[index].join("")}`);
        return false;
      }
    }

    const columns = rows.map((_, index) => rows.map((row) => row[index]));
    console.log(columns);
    for (let index = 0; index < columns.length; index += 1) {
      const { isWord } = isKnown(columns[index].join(""));
      if (!isWord) {
        console.log(`unknown ${columns[index].join("")}`);
        return false;
      }
    }
    return true;
  }

  function Result({ board }) {
    let resultText = "";
    if (getBoardIsFull(board)) {
      if (getGameOver(board)) {
        resultText = "Complete!";
      } else {
        resultText = "Not all rows and columns are known words. Try again!";
      }
    }

    return <div id="result">{resultText}</div>;
  }

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
