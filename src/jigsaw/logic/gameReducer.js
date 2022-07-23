import { shuffleArray } from "../../common/shuffleArray";
import { gameInit } from "./gameInit";
import { getPositionalFractions } from "../../common/getPositionalFractions";
import { partitionArray } from "../../common/partitionArray";

function subtractArrays(baseArray, itemsToRemove) {
  for (let index = 0; index < itemsToRemove.length; index++) {
    let indexToDelete = baseArray.findIndex((i) => i === itemsToRemove[index]);
    baseArray.splice(indexToDelete, 1);
  }
  return baseArray;
}

function shiftRow({ row, shift }) {
  if (shift > 0) {
    return [...Array(shift).fill(""), ...row.slice(0, row.length - shift)];
  } else {
    return [
      ...row.slice(shift * -1, row.length),
      ...Array(shift * -1).fill(""),
    ];
  }
}

function shiftBoard({ board, rowShift, colShift }) {
  // partition the flat board into a grid
  let grid = partitionArray(board, Math.sqrt(board.length));

  // If any letters would move off the board, adjust the shift so that they stay on the board
  let adjustedRowShift = rowShift;
  if (rowShift < 0) {
    for (let index = 0; index < Math.abs(rowShift); index++) {
      if (grid[index].some((i) => i)) {
        adjustedRowShift = -1 * index;
        break;
      }
    }
  } else {
    for (
      let index = grid.length - 1;
      index >= grid.length - rowShift;
      index--
    ) {
      if (grid[index].some((i) => i)) {
        adjustedRowShift = grid.length - 1 - index;
        break;
      }
    }
  }

  let adjustedColShift = colShift;
  const transposedGrid = grid.map((_, index) => grid.map((row) => row[index]));
  if (colShift < 0) {
    for (let index = 0; index < Math.abs(colShift); index++) {
      if (transposedGrid[index].some((i) => i)) {
        adjustedColShift = -1 * index;
        break;
      }
    }
  } else {
    for (
      let index = transposedGrid.length - 1;
      index >= transposedGrid.length - colShift;
      index--
    ) {
      if (transposedGrid[index].some((i) => i)) {
        adjustedColShift = transposedGrid.length - 1 - index;
        break;
      }
    }
  }

  // shift left/right
  grid = grid.map((row) => shiftRow({ row: row, shift: adjustedColShift }));

  // transpose, shift left/right (formerly up/down), untranspose
  grid = grid.map((_, index) => grid.map((row) => row[index]));
  grid = grid.map((row) => shiftRow({ row: row, shift: adjustedRowShift }));
  grid = grid.map((_, index) => grid.map((row) => row[index]));

  // if we cut off any letters, return the board unchanged
  if (
    grid.flatMap((i) => i).filter((i) => i).length ===
    board.flatMap((i) => i).filter((i) => i).length
  ) {
    return grid.flatMap((i) => i);
  } else {
    return board;
  }
}

export function gameReducer(currentGameState, payload) {
  if (payload.action === "dropOnPool") {
    console.log('start drop on pool')
    console.log(JSON.stringify(payload))
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];
    console.log(JSON.stringify(newPool))

    // from the pool
    if (payload.dragArea === "pool") {
      // Update the position of the dragged letter
      newPool = newPool.splice(payload.dragIndex, 1)
      newPool = [...newPool, payload.letter];
    }

    console.log(JSON.stringify(newPool))
    return {
      ...currentGameState,
      pool: newPool,
    };
  }

  if (payload.action === "dropOnBoard") {
    let newBoard = [...currentGameState.board];
    let newPool = [...currentGameState.pool];
    const initialLetterAtDrag = payload.letter;
    const initialLetterAtDrop = newBoard[payload.dropIndex];

    // from the pool
    if (payload.dragArea === "pool") {
      newBoard[payload.dropIndex] = initialLetterAtDrag;

      if (initialLetterAtDrop) {
        // If there was a letter in the board space already, swap that letter to the pool
        newPool[payload.dragIndex].letter = initialLetterAtDrop;
      } else {
        // otherwise just remove the letter from the pool
        newPool = newPool
          .slice(0, payload.dragIndex)
          .concat(
            newPool.slice(parseInt(payload.dragIndex) + 1, newPool.length)
          );
      }
    }

    // from board
    if (payload.dragArea === "board") {
      if (newBoard[payload.dragIndex]) {
        // if we dragged a letter, swap letters at positions
        newBoard[payload.dragIndex] = initialLetterAtDrop;
        newBoard[payload.dropIndex] = initialLetterAtDrag;
      } else {
        // if we dragged and empty spot, move the entire board
        const boardDiameter = Math.sqrt(newBoard.length);
        const oldRowIndex = Math.floor(payload.dragIndex / boardDiameter);
        const newRowIndex = Math.floor(payload.dropIndex / boardDiameter);
        const rowShift = newRowIndex - oldRowIndex;
        const oldColIndex = payload.dragIndex % boardDiameter;
        const newColIndex = payload.dropIndex % boardDiameter;
        const colShift = newColIndex - oldColIndex;
        newBoard = shiftBoard({
          board: newBoard,
          rowShift: rowShift,
          colShift: colShift,
        });
      }
    }

    return {
      ...currentGameState,
      board: newBoard,
      pool: newPool,
    };
  }

  if (payload.action === "newGame") {
    return gameInit({ ...payload, useSaved: false });
  }

  if (payload.action === "getHint") {
    const hints = [...currentGameState.hints];
    const newHintIndex = currentGameState.hintIndex + 1;

    // populate the board with the hints
    const gridSize = Math.sqrt(currentGameState.board.length);
    let newBoard = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => "")
    );
    for (
      let currentHintIndex = 0;
      currentHintIndex < Math.min(newHintIndex, hints.length);
      currentHintIndex++
    ) {
      const hint = hints[currentHintIndex];

      if (!hint.orientationIsRows) {
        newBoard = newBoard.map((_, index) =>
          newBoard.map((row) => row[index])
        );
      }

      for (
        let index = hint.colIndex;
        index < hint.colIndex + hint.word.length;
        index++
      ) {
        newBoard[hint.rowIndex][index] = hint.word[index - hint.colIndex];
      }

      if (!hint.orientationIsRows) {
        newBoard = newBoard.map((_, index) =>
          newBoard.map((row) => row[index])
        );
      }
    }

    // remove the board letters from the pool
    let oldBoardLetters = [...currentGameState.board].filter((i) => i);
    let oldPoolLetters = [...currentGameState.pool.map((i) => i.letter)];
    let allLetters = [...oldBoardLetters, ...oldPoolLetters];
    let newPoolLetters = subtractArrays(
      allLetters,
      newBoard.flatMap((i) => i).filter((i) => i)
    );

    // Generate the new pool
    const positions = getPositionalFractions({
      poolLetters: newPoolLetters,
      maxLettersAcross: newBoard.length,
      stagger: true,
    });
    const newPool = shuffleArray(newPoolLetters).map(
      (letter, index) =>
        new Object({
          letter: letter,
          xFractionalPosition: positions[index].x,
          yFractionalPosition: positions[index].y,
        })
    );
    return {
      ...currentGameState,
      hintIndex: newHintIndex,
      board: newBoard.flatMap((i) => i),
      pool: newPool,
    };
  }

  return { ...currentGameState };
}
