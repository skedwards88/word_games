import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Info from "./Info";
import Board from "./Board";
import { updateGameState } from "./reducer";

const gameLength = 6;

function initTimer({ gameLength }) {
  return {
    remainingTime: gameLength,
    endTime: gameLength,
    state: "paused", // paused | playing | over
  };
}

function timerStateReducer(currentState, payload) {
  if (payload.action === "decrement") {
    return { ...currentState, remainingTime: currentState.remainingTime - 1 };
  }
  if (payload.action === "reset") {
    return initTimer({ gameLength: gameLength });
  }
  if (payload.action === "play") {
    return { ...currentState, state: "playing" };
  }
  if (payload.action === "pause") {
    return { ...currentState, state: "paused" };
  }
  // todo error
  console.log(`unknown ${console.log(JSON.stringify(payload))}`);
}

function Timer({ timerState, timerDispatch }) {
  React.useEffect(() => {
    if (timerState.state === "playing") {
      if (timerState.remainingTime > 0) {
        setTimeout(() => timerDispatch({ action: "decrement" }), 1000);
      }
    }
  });

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

  if (timerState.state === "paused") {
    return (
      <div
        className="modal"
        onClick={() => timerDispatch({ action: "play" })}
      >{`Tap to play`}</div>
    );
  }

  return <></>;
}

function NewGame({ dispatchGameState, timerDispatch }) {
  const [showNewGameConfirmation, setShowNewGameConfirmation] =
    React.useState(false);

  function handleNewGame() {
    dispatchGameState({ action: "newGame" });
    timerDispatch({ action: "reset" });
    setShowNewGameConfirmation(false);
  }
  // todo should pause timer ?
  return showNewGameConfirmation ? (
    <div className="modal">
      New Game?
      <button onClick={() => handleNewGame()}>Yes</button>
      <button onClick={() => setShowNewGameConfirmation(false)}>No</button>
    </div>
  ) : (
    <button
      id="newGameButton"
      onClick={() => setShowNewGameConfirmation(true)}
    ></button>
  );
}

function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    updateGameState,
    4,
    getInitialSetup
  );

  const [timerState, timerDispatch] = React.useReducer(
    timerStateReducer,
    { gameLength: gameLength },
    initTimer
  );

  return (
    <div className="App">
      <TimerBlocker timerState={timerState} timerDispatch={timerDispatch}></TimerBlocker>
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
              disabled={
                timerState.state !== "playing" || timerState.remainingTime <= 0
              }
            ></button>
            <NewGame
              dispatchGameState={dispatchGameState}
              timerDispatch={timerDispatch}
            />
            <Settings />
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
