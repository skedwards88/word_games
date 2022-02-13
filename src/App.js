import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Board from "./Board";
import { updateGameState } from "./reducer";

function FoundWords({ foundWords }) {
  return (
    <div id="foundWords">
      {foundWords.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
}

function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    updateGameState,
    4,
    getInitialSetup
  );

  return (
    <div className="App">
      <div>Score: {gameState.score}</div>
      <FoundWords foundWords={gameState.foundWords} />
      {/* <Settings /> */}
      <div id="currentWord">{gameState.currentWord}</div>
      <Board
        letters={gameState.letters}
        letterAvailabilities={gameState.letterAvailabilities}
        dispatchGameState={dispatchGameState}
      ></Board>
    </div>
  );
}

export default App;
