import React from "react";
import Info from "../../common/Info";
import Pool from "./Pool";
import Result from "./Result";
import Board from "./Board";
import Settings from "./Settings";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

export function dragToken({ event, letter, rowIndex, colIndex, dragArea, dragIndex,relativeTop,relativeLeft }) {
  console.log("dragToken")
  event.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
  event.dataTransfer.setData("letter", letter);
  event.dataTransfer.setData("dragRowIndex", `${rowIndex}`); // touch screen sets 0 as undefined, so convert to string //todo for other ints
  event.dataTransfer.setData("dragColIndex", `${colIndex}`); // touch screen sets 0 as undefined, so convert to string //todo for other ints
  event.dataTransfer.setData("dragArea", dragArea);
  event.dataTransfer.setData("width", event.target.clientWidth);
  event.dataTransfer.setData("height", event.target.clientHeight);

  event.dataTransfer.setData("dragIndex", `${dragIndex}`);
  event.dataTransfer.setData("relativeTop", relativeTop);
  event.dataTransfer.setData("relativeLeft", relativeLeft);

}

export function dragPoolToken({ event, letter, dragIndex, dragArea }) {
  console.log("dragpoolToken")

  event.dataTransfer.setDragImage(document.createElement('img'), 0, 0);
  event.dataTransfer.setData("letter", letter);
  event.dataTransfer.setData("dragIndex", `${dragIndex}`); // touch screen sets 0 as undefined, so convert to string //todo for other ints
  event.dataTransfer.setData("dragArea", dragArea);

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
    console.log('drop on pool')
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

  function handleBoardDrop ({event}) {
    event.preventDefault();

    const dragArea = event.dataTransfer.t.data.dragArea;
    const dragIndex = event.dataTransfer.t.data.dragIndex;

    dispatchGameState({
      action: "dropOnBoard",
      dragArea: dragArea,
      dragIndex: dragIndex,
    }
    )
  }

  function handleBoardDragEnter({ event, rowIndex, colIndex }) {
    event.preventDefault();

    console.log(`handleBoardDragEnter ${rowIndex} ${colIndex}`)
    const dragIndex = event.dataTransfer.t.data.dragIndex;
    const relativeTop = event.dataTransfer.t.data.relativeTop;
    const relativeLeft = event.dataTransfer.t.data.relativeLeft;
    const dragRowIndex = event.dataTransfer.t.data.dragRowIndex;
    const dragColIndex = event.dataTransfer.t.data.dragColIndex;
    const dragArea = event.dataTransfer.t.data.dragArea;

    dispatchGameState({
      action: "dragOverBoard",
      dragIndex: dragIndex,
      relativeTop: relativeTop,
      relativeLeft: relativeLeft,
      dropRowIndex: rowIndex,
      dropColIndex: colIndex,
      dragRowIndex: dragRowIndex,
      dragColIndex: dragColIndex,
      dragArea: dragArea,
    });
  }

  return (
    <div className="App" id="jigsaw">
      <Board board={gameState.board} handleBoardDragEnter={handleBoardDragEnter} handleBoardDrop={handleBoardDrop}></Board>
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
