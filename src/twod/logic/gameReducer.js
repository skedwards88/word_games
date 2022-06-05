import { gameInit } from "./gameInit";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "droppedLetter") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    // Don't allow a hinted letter to be moved
    if (payload.dragArea === "board" && currentGameState.locked[payload.dragIndex]) {
      return {...currentGameState };
    }

    // from pool to board
    if (payload.dragArea === "pool" && payload.dropArea === "board") {
      // If the area where you drop a letter already includes a letter, don't allow it
      if (!newBoard[payload.dropIndex]) {
        newPool[payload.dragIndex] = "";
        newBoard[payload.dropIndex] = payload.letter;
      }
    }

    // from board to pool
    if (payload.dragArea === "board" && payload.dropArea === "pool") {
      if (!newPool[payload.dropIndex]) {
        newBoard[payload.dragIndex] = "";
        newPool[payload.dropIndex] = payload.letter;
      }
    }

    // from pool to pool
    if (payload.dragArea === "pool" && payload.dropArea === "pool") {
      if (!newPool[payload.dropIndex]) {
        newPool[payload.dragIndex] = "";
        newPool[payload.dropIndex] = payload.letter;
      }
    }

    // from board to board
    if (payload.dragArea === "board" && payload.dropArea === "board") {
      if (!newBoard[payload.dropIndex]) {
        newBoard[payload.dragIndex] = "";
        newBoard[payload.dropIndex] = payload.letter;
      }
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
    if (newLocked.every(i=>i)) {
      console.log('no more hints')
    }

    // todo make random hint instead
    const firstFalse = newLocked.findIndex((i)=>i===false)
    newLocked[firstFalse] = true

    // clear the board except for the hints
    for (let index = 0; index < newBoard.length; index++) {
      // reset the board to nothing except the solution that has been hinted
      if (newLocked[index]) {
        newBoard[index] = currentGameState.solution[index]
      } else {
        newBoard[index] = ""
        newPool.push(currentGameState.solution[index])
      }
    }
    // todo use padding function
    newPool = Array(45).fill("").concat(newPool).concat(Array(55-(newPool.length)).fill(""))

    // The pool is just the solution minus what has been hinted
    // todo is it a nicer experience to respect the current pool order?


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

  return {...currentGameState };
}
