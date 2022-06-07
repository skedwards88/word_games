import { shuffleArray } from "../../common/shuffleArray";
import { gameInit } from "./gameInit";

export function gameReducer(currentGameState, payload) {
  // todo add way to swap by click one then click another?

  if (payload.action === "dropOnPool") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    // from board
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
          x: payload.dropX,
          y: payload.dropY,
        })
      );
    }

    // from pool
    if (payload.dragArea === "pool") {
      newPool[payload.dragIndex] = new Object({
        letter: payload.letter,
        x: payload.dropX,
        y: payload.dropY,
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

    // from pool
    if (payload.dragArea === "pool") {
      // If the area where you drop a letter already includes a letter, don't allow it
      //todo swap instead
      if (newBoard[payload.dropIndex]) {
        return { ...currentGameState };
      }
      newPool = newPool
        .slice(0, payload.dragIndex)
        .concat(newPool.slice(parseInt(payload.dragIndex) + 1, newPool.length));
      newBoard[payload.dropIndex] = payload.letter;
    }

    // from board
    if (payload.dragArea === "board") {
      // Don't allow a hinted letter to be moved
      if (currentGameState.locked[payload.dragIndex]) {
        return { ...currentGameState };
      }

      // todo if drag from board to board, swap letters at positions
      const initialLetterAtDrag = newBoard[payload.dragIndex];
      const initialLetterAtDrop = newBoard[payload.dropIndex];

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

    // If there are no more hints to give, do nothing
    if (newLocked.every((i) => i)) {
      console.log("no more hints");
    }

    // todo make random hint instead
    const firstFalse = newLocked.findIndex((i) => i === false);
    newLocked[firstFalse] = true;

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

    poolLetters = shuffleArray(poolLetters);
    // todo reuse the positinoing script from init
    const root = Math.floor(Math.sqrt(poolLetters.length));
    const startingX = 50;
    const startingY = 70;
    for (let index = 0; index < poolLetters.length; index++) {
      const xOffsetFactor =
        Math.floor(index / root) - Math.floor((root - 1) / 2);
      const yOffsetFactor = (index % root) - Math.floor((root - 1) / 2);
      console.log(
        `${xOffsetFactor}, ${yOffsetFactor}; ${xOffsetFactor * 5}, ${
          yOffsetFactor * 5
        }`
      );
      const obj = new Object({
        letter: poolLetters[index],
        x: `${xOffsetFactor * 8 + startingX}vw`,
        y: `${yOffsetFactor * 8 + startingY}vh`, //todo better center
      });
      newPool.push(obj);
    }
    return {
      ...currentGameState,
      locked: newLocked,
      board: newBoard,
      pool: newPool,
    };
  }

  if (payload.action === "newGame") {
    return gameInit();
  }

  return { ...currentGameState };
}
