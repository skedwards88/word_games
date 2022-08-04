export function gameReducer(currentGameState, payload) {
  console.log('in reducer')
  if (payload.action === "dropOnPool") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    // from the pool
    if (payload.dragArea === "pool") {
      const movedPiece = newPool[payload.dragIndex];
      // delete the letter from the old position
      newPool.splice(payload.dragIndex, 1);
      // add the letter to the new position
      if (payload.dropIndex) {
        newPool = [
          ...newPool.slice(0, payload.dropIndex),
          movedPiece,
          ...newPool.slice(payload.dropIndex, newPool.length),
        ];
      } else {
        newPool = [...newPool, movedPiece];
      }
    }

    // from the board
    if (payload.dragArea === "board") {
      const movedPiece = newBoard[payload.dragIndex].letters;
      // delete the letter from the old position
      newBoard.splice(payload.dragIndex, 1);
      // add the letter to the new position
      if (payload.dropIndex) {
        newPool = [
          ...newPool.slice(0, payload.dropIndex),
          movedPiece,
          ...newPool.slice(payload.dropIndex, newPool.length),
        ];
      } else {
        newPool = [...newPool, movedPiece];
      }
    }
    return {
      ...currentGameState,
      pool: newPool,
      board: newBoard,
    };
  }

  if (payload.action === "dragOverBoard" && payload.dragArea === "board") {
    console.log('in correct action')
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    const draggedBoardPieceIndex = payload.dragIndex;
    const newTop =
      newBoard[draggedBoardPieceIndex].top -
      ((currentGameState.dragRowIndex
        ? currentGameState.dragRowIndex
        : payload.dragRowIndex) -
        payload.dropRowIndex);

        console.log(`raw ${payload.dropColIndex}. rel ${newBoard[draggedBoardPieceIndex].left}. adj ${currentGameState.dragColIndex
          ? currentGameState.dragColIndex
          : payload.dragColIndex}. new ${newBoard[draggedBoardPieceIndex].left -
            ((currentGameState.dragColIndex
              ? currentGameState.dragColIndex
              : payload.dragColIndex) -
              payload.dropColIndex)}`)
    const newLeft =
      newBoard[draggedBoardPieceIndex].left -
      ((currentGameState.dragColIndex
        ? currentGameState.dragColIndex
        : payload.dragColIndex) -
        payload.dropColIndex);

    // if top or left is off grid, return early
    if (newTop < 0 || newLeft < 0) {
      console.log(`early return for top left. ${newTop < 0} (${newTop}) ||  ${newLeft < 0} ${newLeft}`)
      return {
        ...currentGameState,
        dragColIndex: payload.dropColIndex,
        dragRowIndex: payload.dropRowIndex,  
      };
    }
    // if bottom or right would go off grid, return early
    const letters = newBoard[draggedBoardPieceIndex].letters;
    if ((newTop + letters.length) > (currentGameState.gridSize)) {
      return {
        ...currentGameState,
        dragColIndex: payload.dropColIndex,
        dragRowIndex: payload.dropRowIndex,  
      };
    }
      if ((newLeft + letters[0].length) > (currentGameState.gridSize)) {
      return {
        ...currentGameState,
        dragColIndex: payload.dropColIndex,
        dragRowIndex: payload.dropRowIndex,  
      };
    }

    newBoard[draggedBoardPieceIndex].top = newTop;
    newBoard[draggedBoardPieceIndex].left = newLeft;

    return {
      ...currentGameState,
      board: newBoard,
      pool: newPool,
      dragColIndex: payload.dropColIndex,
      dragRowIndex: payload.dropRowIndex,
    };
  }

  if (payload.action === "dragOverBoard" && payload.dragArea === "pool") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    const newLetters = newPool[payload.dragIndex];
    const newPiece = {
      letters: newLetters,
      top: payload.dropRowIndex,
      left: payload.dropColIndex,
    };
    newBoard.push(newPiece);
    // delete the letter from the old position in the pool
    newPool.splice(payload.dragIndex, 1);

    return {
      ...currentGameState,
      board: newBoard,
      pool: newPool,
      dragColIndex: payload.dropColIndex,
      dragRowIndex: payload.dropRowIndex,
    };
  }

  if (payload.action === "dropOnBoard") {
    return {
      ...currentGameState,
      dragColIndex: undefined,
      dragRowIndex: undefined,
    };
  }

  return { ...currentGameState };
}
