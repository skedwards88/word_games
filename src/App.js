import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Info from "./Info";
import Board from "./Board";
import { updateGameState } from "./reducer";

const gameLength = 6;

function initTimer({ gameLength }) {
  console.log("timer init");
  return {
    remainingTime: gameLength,
    isRunning: false,
  };
}

function timerStateReducer(currentState, payload) {
  console.log("in timer reducer");
  if (payload.action === "decrement") {
    return { ...currentState, remainingTime: currentState.remainingTime - 1 };
  }
  if (payload.action === "reset") {
    return initTimer({ gameLength: gameLength });
  }
  if (payload.action === "play") {
    return { ...currentState, isRunning: true };
  }
  if (payload.action === "pause") {
    return { ...currentState, isRunning: false };
  }
  // todo make error
  console.log(`unknown ${console.log(JSON.stringify(payload))}`);
}

function Timer({ timerState, timerDispatch }) {
  React.useEffect(() => {
    console.log("timer effect");
    let timerID;
    if (timerState.isRunning) {
      if (timerState.remainingTime > 0) {
        timerID = setInterval(
          () => timerDispatch({ action: "decrement" }),
          1000
        );
      }
    }
    return () => clearInterval(timerID);
  }, [timerState.isRunning]);

  let display;
  if (timerState.remainingTime > 0) {
    const minutes = Math.floor(timerState.remainingTime / 60);
    const seconds = timerState.remainingTime % 60;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    display = `${minutes}:${displaySeconds}`;
  } else {
    display = "GAME OVER";
  }

  return <div>{display}</div>;
}

function FoundWords({ foundWords }) {
  return (
    <div id="foundWords">
      {foundWords.map((word, index) => (
        <div key={index}>{word}</div>
      ))}
    </div>
  );
}

function WordResult({ result }) {
  return result == "" ? <></> : <div className="overlay fadeOut">{result}</div>;
}

function TimerBlocker({ timerState, timerDispatch }) {
  if (timerState.remainingTime <= 0) {
    return <div className="modal fadeOut">{"GAME OVER!"}</div>;
  }

  if (!timerState.isRunning) {
    return (
      <div
        className="modal"
        onClick={() => timerDispatch({ action: "play" })}
      >{`Tap to play`}</div>
    );
  }

  return <></>;
}

function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    updateGameState,
    { gridSize: 4, minWordLength: 3 }, // todo pull from local storage
    getInitialSetup
  );

  const [timerState, timerDispatch] = React.useReducer(
    timerStateReducer,
    { gameLength: gameLength },
    initTimer
  );

  return (
    <div className="App">
      <TimerBlocker
        timerState={timerState}
        timerDispatch={timerDispatch}
      ></TimerBlocker>
      <div>
        <Timer timerState={timerState} timerDispatch={timerDispatch} />
        <div>Score: {gameState.score}</div>
        <FoundWords foundWords={gameState.foundWords} />
        <div id="currentWord">{gameState.currentWord}</div>
        <div className="overlayContainer">
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
            />
            <Info />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

// Settings
// tests
// enums
// new game confirmation
// local storage
// PWA
