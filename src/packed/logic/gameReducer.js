import { shuffleArray } from "../../common/shuffleArray";
import { gameInit } from "./gameInit";
import { getPositionalFractions } from "./getOffsets";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "dropOnPool") {
    console.log('drop on pool')
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
      // Don't allow a hinted letter to be moved
      if (currentGameState.locked[payload.dragIndex]) {
        return { ...currentGameState };
      }

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

    // Don't allow a hinted letter to be replaced
    if (currentGameState.locked[payload.dropIndex]) {
      return { ...currentGameState };
    }

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
      // Don't allow a hinted letter to be moved
      if (currentGameState.locked[payload.dragIndex]) {
        return { ...currentGameState };
      }

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

  if (payload.action === "getHint") {
    let newLocked = [...currentGameState.locked];
    let newBoard = [...currentGameState.board];
    let newPool = [];

    // Get all possible hints indexes
    const falseIndexes = newLocked.reduce(
      (accumulator, item, index) =>
        item ? accumulator : [...accumulator, index],
      []
    );

    // If there are no more hints to give, do nothing
    if (!falseIndexes.length) {
      return { ...currentGameState };
    }

    // Choose a random hint to give
    const hintIndex =
      falseIndexes[Math.floor(Math.random() * falseIndexes.length)];
    newLocked[hintIndex] = true;

    // clear the board except for the hints
    let poolLetters = [];
    for (let index = 0; index < newBoard.length; index++) {
      // reset the board to nothing except the solution that has been hinted
      if (newLocked[index]) {
        newBoard[index] = currentGameState.solution[index];
      } else {
        newBoard[index] = "";
        poolLetters.push(currentGameState.solution[index]);
      }
    }

    const positions = getPositionalFractions(
      poolLetters,
      currentGameState.solution.length
    );
    newPool = shuffleArray(poolLetters).map(
      (letter, index) =>
        new Object({
          letter: letter,
          xFractionalPosition: positions[index].x,
          yFractionalPosition: positions[index].y,
        })
    );

    return {
      ...currentGameState,
      locked: newLocked,
      board: newBoard,
      pool: newPool,
    };
  }

  if (payload.action === "newGame") {
    return gameInit({...payload, useSaved: false });
  }

  return { ...currentGameState };
}
