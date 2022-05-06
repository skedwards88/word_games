import React from "react";
import Info from "../../common/Info";
import Board from "./Board";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";
import Clues from "./Clues";
import CurrentWord from "./CurrentWord";
import { WordResult } from "./WordResult";

function Palette({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

  // todo if not using result other than "gameover", can simplify to just gameOver:bool

  return (
    <div className="App" id="palette">
      <Clues
        clueMatches={gameState.clueMatches}
        clueReveals={gameState.clueReveals}
        clues={gameState.clueIndexes.map((clue) =>
          clue.map((index) => gameState.colors[index])
        )}
        clueLetters={gameState.clueIndexes.map((clue) =>
          clue.map((index) => gameState.letters[index])
        )}
      ></Clues>
      {gameState.result === "Game over" ? (
        <div
          id="currentWord"
          className={gameState.result === "Game over" ? "" : "fadeOut"}
        >
          {gameState.result}
        </div>
      ) : (
        <CurrentWord
          letters={gameState.playedIndexes.map(
            (index) => gameState.letters[index]
          )}
          colors={gameState.playedIndexes.map(
            (index) => gameState.colors[index]
          )}
          result={gameState.result}
        ></CurrentWord>
      )}
      <Board
        letters={gameState.letters}
        colors={gameState.colors}
        letterAvailabilities={
          gameState.result === "Game over"
            ? gameState.letters.map(() => false)
            : gameState.letterAvailabilities
        }
        dispatchGameState={dispatchGameState}
      ></Board>
      <div id="controls">
        <button
          id="newGameButton"
          onClick={() => {
            dispatchGameState({
              action: "newGame",
              gridSize: Math.sqrt(gameState.letters.length),
              minWordLength: gameState.minWordLength,
              easyMode: gameState.easyMode,
            });
          }}
        ></button>
        <button
          id="helpButton"
          onClick={() => dispatchGameState({ action: "hint" })}
        ></button>
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
