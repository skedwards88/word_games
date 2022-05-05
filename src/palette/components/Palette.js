import React from "react";
import Info from "../../common/Info";
import Board from "./Board";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";

function Clue({ clue, index }) {
  return (
    <div className="clue" key={index}>
      {clue.map((color) => (
        <div className={`clueBox ${color}`}></div>
      ))}
    </div>
  );
}

function Patterns({ clues }) {
  const clueDisplays = clues.map((clue, index) => (
    <Clue clue={clue} key={index}></Clue>
  ));

  return (
    <div id="clues">
      {clueDisplays}
      {""}
    </div>
  );
}
function Palette({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  console.log(gameState.colors);

  return (
    <div className="App" id="palette">
      <div id="stats">
        <div id="score">
          <div>SCORE</div>
        </div>
      </div>
      <Patterns clues={gameState.clues}></Patterns>
      <div id="currentWord">WORD</div>
      <Board
        letters={gameState.letters}
        colors={gameState.colors}
        letterAvailabilities={gameState.letterAvailabilities}
        dispatchGameState={dispatchGameState}
      ></Board>
      <div id="controls">
        <Info
          info={
            <div>
              {<h1>Palette</h1>}
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

export default Palette;
