export function gameReducer(currentGameState, payload) {
  if (payload.action === "dropOnPool") {

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
    if (payload.dragArea === "pool" && payload.targetPieceID) {
      const oldPoolIndex = newPieces[payload.pieceID].poolIndex;
      const newPoolIndex = newPieces[payload.targetPieceID].poolIndex;
      newPieces[payload.pieceID].poolIndex = newPoolIndex;
      newPieces[payload.targetPieceID].poolIndex = oldPoolIndex;
    }
    // // if dragging pool to pool and dropping at end,
    // // move the piece to the end and downshift everything that was after
    else if (payload.dragArea === "pool" && !payload.targetPieceID) {
      for (let index = 0; index < newPieces.length; index++) {
        const piece = newPieces[index];
        if (piece.poolIndex > newPieces[payload.pieceID].poolIndex) {
          piece.poolIndex = piece.poolIndex - 1;
        }
      }
      newPieces[payload.pieceID].poolIndex = maxPoolIndex;
    }
    // if dragging board to pool and dropping at end,
    // just add the piece to the end
    else if (payload.dragArea === "board" && !payload.targetPieceID) {
      newPieces[payload.pieceID].poolIndex = allPoolIndexes.length
        ? maxPoolIndex + 1
        : 0;
    }
    // if dragging board to pool and dropping on another piece,
    // insert the piece and upshift everything after
    else if (payload.dragArea === "board" && payload.targetPieceID) {
      const newPoolIndex = newPieces[payload.targetPieceID].poolIndex;
      for (let index = 0; index < newPieces.length; index++) {
        const piece = newPieces[index];
        if (piece.poolIndex >= newPoolIndex) {
          piece.poolIndex = piece.poolIndex + 1;
        }
      }
      newPieces[payload.pieceID].poolIndex = newPoolIndex;
    }

    newPieces[payload.pieceID].boardTop = undefined;
    newPieces[payload.pieceID].boardLeft = undefined;

    return {
      ...currentGameState,
      pieces: newPieces,
    };
  }

  if (payload.action === "dragOverBoard") {
    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces));

    let newTop = payload.dropRowIndex - payload.relativeTop;
    let newLeft = payload.dropColIndex - payload.relativeLeft;

    // if top or left is off grid, return early
    if (newTop < 0 || newLeft < 0) {
      console.log(`early return for top left off grid`);
      return {
        ...currentGameState,
      };
    }

    // if bottom or right would go off grid, return early
    const letters = newPieces[payload.pieceID].letters;
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

    newPieces[payload.pieceID].boardTop = newTop;
    newPieces[payload.pieceID].boardLeft = newLeft;
    
    return {
      ...currentGameState,
      pieces: newPieces,
    };
  }
  
  if (payload.action === "dropOnBoard") {
    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces));
    newPieces[payload.pieceID].poolIndex = undefined;

    return {
      ...currentGameState,
      pieces: newPieces,
    };
  }

  return { ...currentGameState };
}
