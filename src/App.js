import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Info from "./Info";
import Board from "./Board";
import { updateGameState } from "./reducer";
import { initTimer, timerStateReducer, Timer, TimerBlocker } from "./Timer";
import { FoundWords, AllWords } from "./FoundWords";
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

  function handleVisibilityChange() {
    if (
      (document.hidden || document.msHidden || document.webkitHidden) &&
      timerState.isRunning
    ) {
      timerDispatch({ action: "pause" });
    }
  }

  React.useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      removeEventListener("visibilitychange", handleVisibilityChange);
  });

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
      {timerState.remainingTime > 0 ? (
        <FoundWords foundWords={gameState.foundWords} />
      ) : (
        <AllWords
          foundWords={gameState.foundWords}
          allWords={gameState.allWords}
        />
      )}
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
        <button
          id="newGameButton"
          onClick={() => {
            dispatchGameState({
              action: "newGame",
              gridSize: Math.sqrt(gameState.letters.length),
              minWordLength: gameState.minWordLength,
            });
            timerDispatch({
              action: "reset",
              gameLength: timerState.gameLength,
            });
          }}
        ></button>
        <Settings
          dispatchGameState={dispatchGameState}
          gameState={gameState}
          timerDispatch={timerDispatch}
          timerState={timerState}
        />
        <Info timerDispatch={timerDispatch} />
      </div>
    </div>
  );
}

export default App;
