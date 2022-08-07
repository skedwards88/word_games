export function gameReducer(currentGameState, payload) {
  // todo make pool min height so can always drag on to
  // todo handle case where drag off pool but get early return from board...piece disappears
  if (payload.action === "dropOnPool") {
    console.log(JSON.stringify(payload));
    //todo update while drag enter, not just on drop so you get feedback (need to make sure works in reverse too)
    // todo scrolling wont work?
    // todo eliminate space between board and pool

    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces));

    const allPoolIndexes = newPieces
      .filter((i) => i.poolIndex >= 0)
      .map((i) => i.poolIndex);
    console.log(JSON.stringify(allPoolIndexes));
    const maxPoolIndex = allPoolIndexes.reduce(
      (currentMax, comparison) =>
        currentMax > comparison ? currentMax : comparison,
      0
    );

    // if dragging pool to pool and dropping on another piece,
    // swap the positions of those pieces
    if (payload.dragArea === "pool" && payload.targetPieceID) {
      console.log(`CASE A`);
      const oldPoolIndex = newPieces[payload.pieceID].poolIndex;
      const newPoolIndex = newPieces[payload.targetPieceID].poolIndex;
      newPieces[payload.pieceID].poolIndex = newPoolIndex;
      newPieces[payload.targetPieceID].poolIndex = oldPoolIndex;
    }
    // if dragging pool to pool and dropping at end,
    // move the piece to the end and downshift everything that was after
    else if (payload.dragArea === "pool" && !payload.targetPieceID) {
      console.log(`CASE B`);
      console.log(`${newPieces[payload.pieceID].poolIndex} was dragged`);
      console.log(`new will be ${maxPoolIndex}`);
      for (let index = 0; index < newPieces.length; index++) {
        console.log(`piece index ${newPieces[index].poolIndex}...`);
        const piece = newPieces[index];
        if (piece.poolIndex > newPieces[payload.pieceID].poolIndex) {
          console.log(`was updated`);
          piece.poolIndex = piece.poolIndex - 1;
        }
      }
      newPieces[payload.pieceID].poolIndex = maxPoolIndex;
    }
    // if dragging board to pool and dropping at end,
    // just add the piece to the end
    else if (payload.dragArea === "board" && !payload.targetPieceID) {
      console.log(`CASE C`);
      newPieces[payload.pieceID].poolIndex = allPoolIndexes.length
        ? maxPoolIndex + 1
        : 0;
      newPieces[payload.pieceID].boardTop = undefined;
      newPieces[payload.pieceID].boardLeft = undefined;
    }
    // if dragging board to pool and dropping on another piece,
    // insert the piece and upshift everything after
    else if (payload.dragArea === "board" && payload.targetPieceID) {
      console.log(`CASE D`);
      const newPoolIndex = newPieces[payload.targetPieceID].poolIndex;
      for (let index = 0; index < newPieces.length; index++) {
        const piece = newPieces[index];
        if (piece.poolIndex >= newPoolIndex) {
          console.log(`updating from ${piece.poolIndex}`);
          piece.poolIndex = piece.poolIndex + 1;
        }
      }
      newPieces[payload.pieceID].poolIndex = newPoolIndex;
      newPieces[payload.pieceID].boardTop = undefined;
      newPieces[payload.pieceID].boardLeft = undefined;
    }

    console.log(
      JSON.stringify(
        newPieces.filter((i) => i.poolIndex >= 0).map((i) => i.poolIndex)
      )
    );
    return {
      ...currentGameState,
      pieces: newPieces,
    };
  }

  if (payload.action === "dragOverBoard") {
    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces)); // todo not sure if this will be a deep copy/if that's ok

    let newTop;
    if (payload.dragArea === "pool") {
      newTop = payload.dropRowIndex;
    } else {
      newTop =
        newPieces[payload.pieceID].boardTop -
        ((currentGameState.dragRowIndex
          ? currentGameState.dragRowIndex
          : payload.dragRowIndex) -
          payload.dropRowIndex);
    }

    let newLeft;
    if (payload.dragArea === "pool") {
      newLeft = payload.dropColIndex;
    } else {
      newLeft =
        newPieces[payload.pieceID].boardLeft -
        ((currentGameState.dragColIndex
          ? currentGameState.dragColIndex
          : payload.dragColIndex) -
          payload.dropColIndex);
    }

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
      dragColIndex: payload.dropColIndex,
      dragRowIndex: payload.dropRowIndex,
    };
  }

  if (payload.action === "dropOnBoard") {
    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces)); // todo not sure if this will be a deep copy/if that's ok
    newPieces[payload.pieceID].poolIndex = undefined;

    return {
      ...currentGameState,
      dragColIndex: undefined,
      dragRowIndex: undefined,
      pieces: newPieces,
    };
  }

  return { ...currentGameState };
}

// todo gray out pool piece when dragging
