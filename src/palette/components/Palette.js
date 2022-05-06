import React from "react";
import Info from "../../common/Info";
import Board from "./Board";
import { gameIndex } from "../../gameIndex";
import { gameInit } from "../logic/gameInit";
import { gameReducer } from "../logic/gameReducer";
import Clues from "./Clues";
import CurrentWord from "./CurrentWord";

function Palette({ setCurrentDisplay }) {
  const [gameState, dispatchGameState] = React.useReducer(
    gameReducer,
    {},
    gameInit
  );

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
      {gameState.clueMatches.every((i) => i) ? (
        <div id="currentWord">Complete!</div>
      ) : (
        <CurrentWord
          letters={gameState.playedIndexes.map(
            (index) => gameState.letters[index]
          )}
          colors={gameState.playedIndexes.map(
            (index) => gameState.colors[index]
          )}
        ></CurrentWord>
      )}
      <Board
        letters={gameState.letters}
        colors={gameState.colors}
        letterAvailabilities={
          gameState.clueMatches.every((i) => i)
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
