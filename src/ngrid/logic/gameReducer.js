import { shuffleArray } from "../../common/shuffleArray";
import { gameInit } from "./gameInit";
import { getPositionalFractions } from "../../common/getPositionalFractions";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "dropOnPool") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    const vhInPx =
      Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
      100;
    const vwInPx =
      Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
      100;

    // from the board
    if (payload.dragArea === "board") {

      // remove the letter at the dragged board index
      newBoard[payload.dragIndex] = "";

      // Add the letter to the pool with the dropped position
      newPool.push(
        new Object({
          letter: payload.letter,
          xFractionalPosition: payload.dropX / vwInPx,
          yFractionalPosition: payload.dropY / vhInPx,
        })
      );
    }

    // from the pool
    if (payload.dragArea === "pool") {
      // Update the position of the dragged letter
      newPool[payload.dragIndex] = new Object({
        letter: payload.letter,
        xFractionalPosition: payload.dropX / vwInPx,
        yFractionalPosition: payload.dropY / vhInPx,
      });
    }

    return {
      ...currentGameState,
      board: newBoard,
      pool: newPool,
    };
  }

  if (payload.action === "dropOnBoard") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];
    const initialLetterAtDrag = payload.letter;
    const initialLetterAtDrop = newBoard[payload.dropIndex];

    // from the pool
    if (payload.dragArea === "pool") {
      newBoard[payload.dropIndex] = initialLetterAtDrag;

      if (initialLetterAtDrop) {
        // If there was a letter in the board space already, swap that letter to the pool
        newPool[payload.dragIndex].letter = initialLetterAtDrop;
      } else {
        // otherwise just remove the letter from the pool
        newPool = newPool
          .slice(0, payload.dragIndex)
          .concat(
            newPool.slice(parseInt(payload.dragIndex) + 1, newPool.length)
          );
      }
    }

    // from board
    if (payload.dragArea === "board") {
      // swap letters at positions
      newBoard[payload.dragIndex] = initialLetterAtDrop;
      newBoard[payload.dropIndex] = initialLetterAtDrag;
    }

    return {
      ...currentGameState,
      board: newBoard,
      pool: newPool,
    };
  }

  if (payload.action === "newGame") {
    return gameInit({ useSaved: false });
  }

  return { ...currentGameState };
}
