import { gameInit } from "./gameInit";

export function gameReducer(currentGameState, payload) {
  console.log(JSON.stringify(payload))
  if (payload.action === "newGame") {
    return gameInit(payload);
  }
  if (payload.action === "startDrag") {
    // store drag data in the game state
    // since drag event data is only available to
    // the drag start and drop events (not drag enter)
    return {
      ...currentGameState,
      dragData: {
        pieceID: payload.pieceID,
        dragArea: payload.dragArea,
        relativeTop: payload.relativeTop,
        relativeLeft: payload.relativeLeft,
        boardLeft: payload.boardLeft,
        boardTop: payload.boardTop,
      },
    };
  } else if (
    payload.action === "dropOnPool" ||
    payload.action === "dragOverPool"
  ) {
    const dragData = currentGameState.dragData;

    // if dragging a blank space from the pool, return early
    if (dragData.pieceID === undefined) {
      return {
        ...currentGameState,
      };
    }

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

  // if dragging a blank spot on the board
  else if (
    currentGameState.dragData.pieceID === undefined &&
    (payload.action === "dragOverBoard" || payload.action === "dropOnBoard")
  ) {
    let newPieces = JSON.parse(JSON.stringify(currentGameState.pieces));

    let boardPieces = newPieces.filter(
      (piece) => piece.boardTop >= 0 && piece.boardLeft >= 0
    );

    if (!boardPieces.length) {
      // return early if the board is empty
      return { ...currentGameState };
    }
    const dragData = currentGameState.dragData;
    const oldRowIndex = dragData.boardTop;
    const newRowIndex = payload.dropRowIndex;
    const rowShift = newRowIndex - oldRowIndex;
    const oldColIndex = dragData.boardLeft;
    const newColIndex = payload.dropColIndex;
    const colShift = newColIndex - oldColIndex;

    // shift the pieces
    for (let pieceIndex = 0; pieceIndex < newPieces.length; pieceIndex++) {
      // skip the piece if not on the board
      if (newPieces[pieceIndex].boardTop === undefined) {
        continue;
      }
      // return early if any piece would go off board
      if (
        newPieces[pieceIndex].boardTop + rowShift < 0 ||
        newPieces[pieceIndex].boardLeft + colShift < 0 ||
        newPieces[pieceIndex].boardTop + newPieces[pieceIndex].letters.length + rowShift > currentGameState.gridSize ||
        newPieces[pieceIndex].boardLeft +  newPieces[pieceIndex].letters[0].length + colShift > currentGameState.gridSize
      ) {
        return {
          ...currentGameState,
          dragData: {
            ...dragData,
            boardTop: payload.dropRowIndex,
            boardLeft: payload.dropColIndex,
          },
        };
      }
      newPieces[pieceIndex].boardTop =
        newPieces[pieceIndex].boardTop + rowShift;
      newPieces[pieceIndex].boardLeft =
        newPieces[pieceIndex].boardLeft + colShift;
    }
    return {
      ...currentGameState,
      pieces: newPieces,
      dragData: {
        ...dragData,
        boardTop: payload.dropRowIndex,
        boardLeft: payload.dropColIndex,
      },
    };
  }

  // dragging/dropping a piece over the board
  else if (
    currentGameState.dragData.pieceID !== undefined &&
    (payload.action === "dragOverBoard" || payload.action === "dropOnBoard")
  ) {
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

  return { ...currentGameState };
}
