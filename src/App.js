import React from "react";
import "./App.css";
import { getInitialSetup } from "./getInitialSetup";
import Settings from "./Settings";
import Board from "./Board";
import { updateGameState } from "./reducer";

function Timer({ timerState, setTimerState }) {
  const endTime = 20;
  // const endTime = 3 * 60;
  const [elapsedTime, setElapsedTime] = React.useState(endTime);

  React.useEffect(() => {
    console.log("lay");
    console.log(timerState);
    console.log(elapsedTime);
    if (timerState === "playing") {
      if (elapsedTime > 0) {
        setTimeout(() => setElapsedTime(elapsedTime - 1), 1000);
      } else {
        setTimerState("over");
      }
    }
  });

  const isDisabled = timerState !== "playing";
  const pauseButton = (
    <button onClick={() => setTimerState("paused")} disabled={isDisabled}>
      Pause
    </button>
  );

  let display;
  if (elapsedTime > 0) {
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const displaySeconds = seconds < 10 ? `0${seconds}` : seconds;
    display = `${minutes}:${displaySeconds}`;
  } else {
    display = "GAME OVER";
  }

  return (
    <div>
      {display}
      {pauseButton}
    </div>
  );
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

function Result({ result }) {
  return result == "" ? <></> : <div className="overlay fadeOut">{result}</div>;
}

function Overlay({ timerState, setTimerState }) {
  if (timerState === "over") {
    return (
      <div className="overlay fadeOut" onClick={() => setTimerState("")}>
        {"GAME OVER!"}
      </div>
    );
  }
  if (timerState === "paused") {
    return (
      <div
        className="overlay"
        onClick={() => setTimerState("playing")}
      >{`Press to play`}</div>
    );
  }
  return <></>;
}

function App() {
  const [gameState, dispatchGameState] = React.useReducer(
    updateGameState,
    4,
    getInitialSetup
  );

  const [timerState, setTimerState] = React.useState("paused"); // paused | playing | over
  console.log(timerState);
  return (
    <div className="App overlayContainer">
      <Overlay timerState={timerState} setTimerState={setTimerState}></Overlay>
      <div className="overlaid">
        <Timer timerState={timerState} setTimerState={setTimerState} />
        <div>Score: {gameState.score}</div>
        <FoundWords foundWords={gameState.foundWords} />
        {/* <Settings /> */}
        <div id="currentWord">{gameState.currentWord}</div>
        <div className="overlayContainer">
          <Result result={gameState.result} />
          <Board
            letters={gameState.letters}
            letterAvailabilities={
              timerState === "over"
                ? gameState.letters.map((_) => false)
                : gameState.letterAvailabilities
            }
            dispatchGameState={dispatchGameState}
          ></Board>
        </div>
      </div>
    </div>
  );
}

export default App;

// new game button
// / Settings
// tests
// when game over, can't find more words
