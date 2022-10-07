import React from "react";
import { gameInit } from "../logic/gameInit";
import Settings from "./Settings";
import Info from "../../common/Info";
import Board from "./Board";
import { Timer, TimerBlocker } from "./Timer";
import { FoundWords, AllWords } from "./FoundWords";
import { WordResult } from "./WordResult";
import Score from "./Score";
import { timerInit } from "../logic/timerInit";
import { timerReducer } from "../logic/timerReducer";
import { gameReducer } from "../logic/gameReducer";
import { gameIndex } from "../../gameIndex";

function Gribbles({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  const [timerState, timerDispatch] = React.useReducer(
    timerReducer,
    {},
    timerInit
  );

  React.useEffect(() => {
    //todo is it ok for useEffect to call dispatch?
    if (gameState.foundWords.length > 0) {
      timerDispatch({ action: "increment" });
    }
  }, [gameState.foundWords]);

  React.useEffect(() => {
    window.localStorage.setItem(
      "gridSize",
      JSON.stringify(Math.sqrt(gameState.letters.length))
    );
  }, [gameState.letters]);

  React.useEffect(() => {
    window.localStorage.setItem("easyMode", JSON.stringify(gameState.easyMode));
  }, [gameState.easyMode]);

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
    <div
      className="App"
      id="gribbles"
      onPointerUp={(e) => {
        e.preventDefault();

        dispatchGameState({
          action: "endWord",
        });
      }}
    >
      <TimerBlocker
        timerState={timerState}
        timerDispatch={timerDispatch}
      ></TimerBlocker>
      <div id="stats">
        <Timer timerState={timerState} timerDispatch={timerDispatch} />
        <Score
          foundWordCount={gameState.foundWords.length}
          bonusWordCount={gameState.easyMode ? gameState.bonusWordCount : null}
          maxWordCount={gameState.allWords.length}
        ></Score>
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
        {gameState.playedIndexes.length > 0
          ? gameState.playedIndexes
              .map((index) => gameState.letters[index])
              .join("")
          : " "}
      </div>
      <WordResult result={gameState.result} />
      <Board
        letters={gameState.letters}
        playedIndexes={gameState.playedIndexes}
        gameOver={timerState.remainingTime <= 0}
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
              easyMode: gameState.easyMode,
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
        <Info
          info={
            <div>
              {<h1>Gribbles</h1>}
              {`\n\nConnect adjacent letters to build words. Can you find all the words before time is up?`}
            </div>
          }
          sideEffectShow={() => timerDispatch({ action: "pause" })}
          sideEffectHide={() => timerDispatch({ action: "play" })}
        ></Info>
        <button
          id="homeButton"
          onClick={() => setCurrentDisplay(gameIndex.Home)}
        ></button>
      </div>
    </div>
  );
}

export default Gribbles;
