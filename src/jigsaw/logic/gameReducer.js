

export function gameReducer(currentGameState, payload) {
  if (payload.action === "dropOnPool") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];
    console.log(JSON.stringify(newPool))

    // from the pool
    if (payload.dragArea === "pool") {
      const movedPiece = newPool[payload.dragIndex]
      // delete the letter from the old position
      newPool.splice(payload.dragIndex, 1)
      // add the letter to the new position
      if (payload.dropIndex) {
        newPool = [...newPool.slice(0, payload.dropIndex), movedPiece, ...newPool.slice(payload.dropIndex, newPool.length)]
      } else {
        newPool = [...newPool, movedPiece]
      }
    }

    // from the board
    if (payload.dragArea === "board") {
      console.log(`drag from board to pool. ${payload.dragIndex}`)
      const movedPiece = newBoard[payload.dragIndex]
      // delete the letter from the old position
      newBoard.splice(payload.dragIndex, 1)
      // add the letter to the new position
      if (payload.dropIndex) {
        newPool = [...newPool.slice(0, payload.dropIndex), movedPiece, ...newPool.slice(payload.dropIndex, newPool.length)]
      } else {
        newPool = [...newPool, movedPiece]
      }
    }

    return {
      ...currentGameState,
      pool: newPool,
      board: newBoard,
    };
  }

  if (payload.action === "dropOnBoard") {
    console.log(`drop on board`)
    console.log(JSON.stringify(payload))

    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    // from the pool
    if (payload.dragArea === "pool") {
      const movedPiece = newPool[payload.dragIndex]
      // delete the letter from the old position in the pool
      newPool.splice(payload.dragIndex, 1)

      // add the letter at the correct position on the board
      const newBoardPiece = {
        letters: movedPiece,
        x: payload.dropX,
        y: payload.dropY,
      }
      newBoard.push(newBoardPiece)

    }

    // from the board
    if (payload.dragArea === "board") {
      newBoard[payload.dragIndex].x = payload.dropX
      newBoard[payload.dragIndex].y = payload.dropY

    }
    return {
      ...currentGameState,
      pool: newPool,
      board: newBoard,
    };
  }
  return { ...currentGameState };
}
