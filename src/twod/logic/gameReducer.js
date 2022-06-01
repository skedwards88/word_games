export function gameReducer(currentGameState, payload) {
  if (payload.action === "droppedLetter") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    // If the area where you want to drop a letter already includes a letter, don't allow it

    // from pool to board
    if (payload.dragArea === "pool" && payload.dropArea === "board") {
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

  return { ...currentGameState };
}
