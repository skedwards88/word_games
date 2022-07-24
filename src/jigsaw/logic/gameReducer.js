

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
        newPool = [...newPool.slice(0,payload.dropIndex),movedPiece,...newPool.slice(payload.dropIndex,newPool.length)]
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
        newPool = [...newPool.slice(0,payload.dropIndex),movedPiece,...newPool.slice(payload.dropIndex,newPool.length)]
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

  return { ...currentGameState };
}
