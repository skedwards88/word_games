import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Info from "./Info";
import Board from "./Board";
import { updateGameState } from "./reducer";

function initTimer({ gameLength }) {
  return {
    remainingTime: gameLength,
    isRunning: false,
    gameLength: gameLength,
  };
}

function timerStateReducer(currentTimerState, payload) {
  if (payload.action === "decrement") {
    const newRemainingTime = currentTimerState.remainingTime - 1;
    return {
      ...currentTimerState,
      remainingTime: newRemainingTime,
      isRunning: newRemainingTime > 0 ? currentTimerState.isRunning : false,
    };
  }
  if (payload.action === "reset") {
    return initTimer({ gameLength: payload.gameLength });
  }
  if (payload.action === "play") {
    return { ...currentTimerState, isRunning: true };
  }
  if (payload.action === "pause") {
    return { ...currentTimerState, isRunning: false };
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
  return result == "" ? (
    <></>
  ) : (
    <div id="wordResult" className="fadeOut">
      {result}
    </div>
  );
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

// Settings
// tests
// enums
// new game confirmation
// local storage
// PWA
// give word list credit
