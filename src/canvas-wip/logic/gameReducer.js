export function gameReducer(currentGameState, payload) {
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

  if (payload.action === "dropOnBoard") {

    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];

    // Convert the pixels where the letter was dropped to a percentage of the board dimensions.
    // We do this instead of keeping relative to the screen dimensions so that we can snap the piece to a virtual grid.
    // And we use percentage instead of pixels so that screen rotation/resizing is seamless todo need to do this part
    const xFractionalPosition =
    ((payload.dropX - payload.boardLeft) / payload.boardWidth) * 100;
    const yFractionalPosition =
    ((payload.dropY - payload.boardTop) / payload.boardHeight) * 100;

    const letterHeightPercent = (payload.pieceHeight / payload.boardHeight ) / 3 * 100;
    const letterWidthPercent = (payload.pieceWidth / payload.boardWidth ) / 3 * 100;

    const snappedY = (Math.round(yFractionalPosition / letterHeightPercent) * letterHeightPercent);
    const snappedX = (Math.round(xFractionalPosition / letterWidthPercent) * letterWidthPercent);

    // // from the pool
    if (payload.dragArea === "pool") {

      const movedPiece = newPool[payload.dragIndex];
      // delete the letter from the old position in the pool
      newPool.splice(payload.dragIndex, 1);

      // add the letter at the correct position on the board
      const newBoardPiece = {
        letters: movedPiece,
        x: snappedX,
        y: snappedY,
      };
      newBoard.push(newBoardPiece);
    }

    // from the board
    if (payload.dragArea === "board") {
      newBoard[payload.dragIndex].x = snappedX;
      newBoard[payload.dragIndex].y = snappedY;
    }
    return {
      ...currentGameState,
      pool: newPool,
      board: newBoard,
    };
  }
  return { ...currentGameState };
}
