import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Info from "./Info";
import Board from "./Board";
import { updateGameState } from "./reducer";
import { initTimer, timerStateReducer, Timer, TimerBlocker } from "./Timer";
import { FoundWords } from "./FoundWords";
import { WordResult } from "./WordResult";

function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    updateGameState,
    { gridSize: 4, minWordLength: 3 },
    getInitialSetup
  );

  const [timerState, timerDispatch] = React.useReducer(
    timerStateReducer,
    { gameLength: 3 * 60 },
    initTimer
  );

  return (
    <div className="App">
      <TimerBlocker
        timerState={timerState}
        timerDispatch={timerDispatch}
      ></TimerBlocker>
      <div id="stats">
        <Timer timerState={timerState} timerDispatch={timerDispatch} />
        <div>Score: {gameState.score}</div>
      </div>
      <FoundWords foundWords={gameState.foundWords} />
      <div id="currentWord">
        {gameState.currentWord ? gameState.currentWord : " "}
      </div>
      <WordResult result={gameState.result} />
      <Board
        letters={gameState.letters}
        letterAvailabilities={
          timerState.remainingTime <= 0
            ? gameState.letters.map((_) => false)
            : gameState.letterAvailabilities
        }
        dispatchGameState={dispatchGameState}
      ></Board>
      <div id="controls">
        <button
          id="pauseButton"
          onClick={() => timerDispatch({ action: "pause" })}
          disabled={!timerState.isRunning || timerState.remainingTime <= 0}
        ></button>
        <Settings
          dispatchGameState={dispatchGameState}
          gameState={gameState}
          timerDispatch={timerDispatch}
          timerState={timerState}
        />
        <Info />
      </div>
    </div>
  );
}

export default App;
