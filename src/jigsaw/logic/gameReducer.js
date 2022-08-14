export function gameReducer(currentGameState, payload) {
  if (payload.action === "startDrag") {
    console.log(`setting drag data as ${JSON.stringify(payload)}`)

    return {
      ...currentGameState,
      dragData: {
        pieceID: payload.pieceID,
        dragArea: payload.dragArea,
        relativeTop: payload.relativeTop,
        relativeLeft: payload.relativeLeft  
      }
    }
  }

  if (payload.action === "dropOnPool" || payload.action === "dropOverPool") {
    const dragData = currentGameState.dragData;
    console.log(JSON.stringify(dragData))

    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces));
    const allPoolIndexes = newPieces
      .filter((i) => i.poolIndex >= 0)
      .map((i) => i.poolIndex);
    const maxPoolIndex = allPoolIndexes.reduce(
      (currentMax, comparison) =>
        currentMax > comparison ? currentMax : comparison,
      0
    );

    // if dragging pool to pool and dropping on another piece,
    // swap the positions of those pieces
    if (dragData.dragArea === "pool" && payload.targetPieceID) {
      const oldPoolIndex = newPieces[dragData.pieceID].poolIndex;
      const newPoolIndex = newPieces[payload.targetPieceID].poolIndex;
      newPieces[dragData.pieceID].poolIndex = newPoolIndex;
      newPieces[payload.targetPieceID].poolIndex = oldPoolIndex;
    }
    // // if dragging pool to pool and dropping at end,
    // // move the piece to the end and downshift everything that was after
    else if (dragData.dragArea === "pool" && !payload.targetPieceID) {
      for (let index = 0; index < newPieces.length; index++) {
        const piece = newPieces[index];
        if (piece.poolIndex > newPieces[dragData.pieceID].poolIndex) {
          piece.poolIndex = piece.poolIndex - 1;
        }
      }
      newPieces[dragData.pieceID].poolIndex = maxPoolIndex;
    }
    // if dragging board to pool and dropping at end,
    // just add the piece to the end
    else if (dragData.dragArea === "board" && !payload.targetPieceID) {
      newPieces[dragData.pieceID].poolIndex = allPoolIndexes.length
        ? maxPoolIndex + 1
        : 0;
    }
    // if dragging board to pool and dropping on another piece,
    // insert the piece and upshift everything after
    else if (dragData.dragArea === "board" && payload.targetPieceID) {
      const newPoolIndex = newPieces[payload.targetPieceID].poolIndex;
      for (let index = 0; index < newPieces.length; index++) {
        const piece = newPieces[index];
        if (piece.poolIndex >= newPoolIndex) {
          piece.poolIndex = piece.poolIndex + 1;
        }
      }
      newPieces[dragData.pieceID].poolIndex = newPoolIndex;
    }

    newPieces[dragData.pieceID].boardTop = undefined;
    newPieces[dragData.pieceID].boardLeft = undefined;

    return {
      ...currentGameState,
      pieces: newPieces,
      dragData: payload.action === "dropOnPool" ? {} : dragData,
    };
  }

  if (payload.action === "dragOverBoard" || payload.action === "dropOnBoard") {
    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces));
    const dragData = currentGameState.dragData;

    let newTop = payload.dropRowIndex - dragData.relativeTop;
    let newLeft = payload.dropColIndex - dragData.relativeLeft;

    // if top or left is off grid, return early
    if (newTop < 0 || newLeft < 0) {
      console.log(`early return for top left off grid`);
      return {
        ...currentGameState,
      };
    }

    // if bottom or right would go off grid, return early
    const letters = newPieces[dragData.pieceID].letters;
    if (newTop + letters.length > currentGameState.gridSize) {
      console.log(`early return for bottom off grid`);
      return {
        ...currentGameState,
      };
    }
    if (newLeft + letters[0].length > currentGameState.gridSize) {
      console.log(`early return for right off grid`);
      return {
        ...currentGameState,
      };
    }

    newPieces[dragData.pieceID].boardTop = newTop;
    newPieces[dragData.pieceID].boardLeft = newLeft;
    if (payload.action === "dropOnBoard") {
      newPieces[dragData.pieceID].poolIndex = undefined;
    }
    return {
      ...currentGameState,
      pieces: newPieces,
      dragData: payload.action === "dropOnBoard" ? {} : dragData,

    };
  }
  
  // if (payload.action === "dropOnBoard") {
  //   let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces));
  //   const dragData = currentGameState.dragData;
  //   newPieces[dragData.pieceID].poolIndex = undefined;

  //   return {
  //     ...currentGameState,
  //     pieces: newPieces,
  //     dragData: {},
  //   };
  // }

  return { ...currentGameState };
}
