import React from "react";
import "./App.css";
import { getInitialGameState } from "./getInitialGameState";
import Settings from "./Settings";
import Info from "./Info";
import Board from "./Board";
import { updateGameState } from "./updateGameState";
import { initTimer, timerStateReducer, Timer, TimerBlocker } from "./Timer";
import { FoundWords, AllWords } from "./FoundWords";
import { WordResult } from "./WordResult";
import Score from "./Score";

function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    updateGameState,
    {},
    getInitialGameState
  );

  const [timerState, timerDispatch] = React.useReducer(
    timerStateReducer,
    {},
    initTimer
  );

  React.useEffect(() => {
    //todo is it ok for useEffect to call dispatch?
    if (gameState.foundWords.length > 0){
    timerDispatch({ action: "increment" })
  }
  }, [gameState.foundWords])

  React.useEffect(() => {
    window.localStorage.setItem(
      "gridSize",
      JSON.stringify(Math.sqrt(gameState.letters.length))
    );
  }, [gameState.letters]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "minWordLength",
      JSON.stringify(gameState.minWordLength)
    );
  }, [gameState.minWordLength]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "gameLength",
      JSON.stringify(timerState.gameLength)
    );
  }, [timerState.gameLength]);
  
  React.useEffect(() => {
    window.localStorage.setItem(
      "bonusTime",
      JSON.stringify(timerState.bonusTime)
    );
  }, [timerState.bonusTime]);

  function handleVisibilityChange() {
    // Pause the timer if the page is hidden
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
        <Score foundWords={gameState.foundWords} allWords={gameState.allWords}></Score>
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
            ? gameState.letters.map(() => false)
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
