import { generateGrid } from "./generateGrid";
import { partitionArray } from "../../common/partitionArray";
import { shuffleArray } from "../../common/shuffleArray";

function rowIsEmpty(row) {
  return !row.filter((letter) => letter).length;
}

function trimPiece(piece) {
  let trimmedPiece = JSON.parse(JSON.stringify(piece));

  // trim from top
  for (let rowIndex = 0; rowIndex < piece.length; rowIndex++) {
    if (rowIsEmpty(piece[rowIndex])) {
      trimmedPiece.splice(0, 1);
    } else {
      break;
    }
  }
  // trim from bottom
  for (let rowIndex = piece.length - 1; rowIndex >= 0; rowIndex--) {
    if (rowIsEmpty(piece[rowIndex])) {
      trimmedPiece.splice(trimmedPiece.length - 1, 1);
    } else {
      break;
    }
  }
  // trim from left
  for (let colIndex = 0; colIndex < piece[0].length; colIndex++) {
    const column = piece.map((row) => row[colIndex]);
    if (rowIsEmpty(column)) {
      const numRows = trimmedPiece.length;
      for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        trimmedPiece[rowIndex].splice(0, 1);
      }
    } else {
      break;
    }
  }
  // trim from right
  for (let colIndex = piece.length - 1; colIndex >= 0; colIndex--) {
    const column = piece.map((row) => row[colIndex]);
    if (rowIsEmpty(column)) {
      const numRows = trimmedPiece.length;
      for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        trimmedPiece[rowIndex].splice(trimmedPiece[rowIndex].length - 1, 1);
      }
    } else {
      break;
    }
  }
  return trimmedPiece;
}

function getPiecesFromBoard(grid, pieceSize) {
  // console.log(JSON.stringify(grid))
  // break the board into subgrids
  const partitionedRows = grid.map((row) => partitionArray(row, pieceSize));
  let pieces = [];
  for (
    let startRow = 0;
    startRow <= partitionedRows.length - pieceSize;
    startRow = startRow + pieceSize
  ) {
    for (
      let colIndex = 0;
      colIndex < partitionedRows[startRow].length;
      colIndex++
    ) {
      let piece = [];
      for (
        let rowIndex = startRow;
        rowIndex < startRow + pieceSize;
        rowIndex++
      ) {
        piece.push(partitionedRows[rowIndex][colIndex]);
      }

      // add the piece if it is not empty
      if (piece.filter((row) => row.filter((letter) => letter).length).length) {
        const trimmedPiece = trimPiece(piece);

        pieces.push(trimmedPiece);
      }
    }
  }
  // return pieces;
  return shuffleArray(pieces);
}

function getPieceDimension(pieceData) {
  const maxTop = pieceData
    .map((data) => data.top)
    .reduce(
      (currentMax, comparison) =>
        currentMax > comparison ? currentMax : comparison,
      0
    );
  const minTop = pieceData
    .map((data) => data.top)
    .reduce(
      (currentMin, comparison) =>
        currentMin < comparison ? currentMin : comparison,
      0
    );
  const numRows = maxTop - minTop + 1;

  const maxLeft = pieceData
    .map((data) => data.left)
    .reduce(
      (currentMax, comparison) =>
        currentMax > comparison ? currentMax : comparison,
      0
    );
  const minLeft = pieceData
    .map((data) => data.left)
    .reduce(
      (currentMin, comparison) =>
        currentMin < comparison ? currentMin : comparison,
      0
    );
  const numCols = maxLeft - minLeft + 1;

  return {
    numCols: numCols,
    numRows: numRows,
    maxTop: maxTop,
    minTop: minTop,
    maxLeft: maxLeft,
    minLeft: minLeft,
  };
}

function assemblePiece(pieceData) {
  const { numCols, numRows, minTop, minLeft } = getPieceDimension(pieceData);
  const topAdjust = Math.abs(Math.min(0, minTop));
  const leftAdjust = Math.abs(Math.min(0, minLeft));

  let grid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => "")
  );
  for (let pieceIndex = 0; pieceIndex < pieceData.length; pieceIndex++) {
    grid[pieceData[pieceIndex].top + topAdjust][
      pieceData[pieceIndex].left + leftAdjust
    ] = pieceData[pieceIndex].letter;
  }
  return grid;
}

function makePieces(grid) {
  const maxPieceLetters = 5; //todo can randomize num letters
  const maxPieceDimension = 3;
  const remainingGrid = JSON.parse(JSON.stringify(grid));
  const piecesData = [];

  for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    for (let colIndex = 0; colIndex < grid[rowIndex].length; colIndex++) {
      // at this index, check if there is a letter in the remaining grid
      if (remainingGrid[rowIndex][colIndex]) {
        // if there is a letter, remove the letter from the remaining grid and start a piece
        const letter = remainingGrid[rowIndex][colIndex];
        let pieceData = [
          {
            letter: letter,
            top: 0,
            left: 0,
          },
        ];
        remainingGrid[rowIndex][colIndex] = "";

        // from this starting point, look in each direction for a letter
        let pieceLevel = 0;
        const directions = [
          [0, 1],
          [0, -1],
          [1, 0],
          [-1, 0],
        ]; //todo can randomize order
        // Keep adding letters to the piece
        // until the piece has the max number of letters
        // or until we have searched around all of the letters in the piece
        while (
          pieceData.length < maxPieceLetters &&
          pieceLevel < pieceData.length
        ) {
          let surroundedPieceRow = pieceData[pieceLevel].top;
          let surroundedPieceCol = pieceData[pieceLevel].left;
          for (
            let directionIndex = 0;
            directionIndex < directions.length;
            directionIndex++
          ) {
            const [rowOffset, colOffset] = directions[directionIndex];
            // if there is a letter
            if (
              remainingGrid?.[rowIndex + surroundedPieceRow + rowOffset]?.[
                colIndex + surroundedPieceCol + colOffset
              ]
            ) {
              // and if adding this letter to the piece won't exceed the max piece dimension
              const { numCols, numRows } = getPieceDimension([
                ...pieceData,
                {
                  top: surroundedPieceRow + rowOffset,
                  left: surroundedPieceCol + colOffset,
                },
              ]);
              if (
                numCols <= maxPieceDimension &&
                numRows <= maxPieceDimension
              ) {
                // remove the letter from the remaining grid and add it to the piece
                const surroundingLetter =
                  remainingGrid[rowIndex + surroundedPieceRow + rowOffset][
                    colIndex + surroundedPieceCol + colOffset
                  ];
                pieceData.push({
                  letter: surroundingLetter,
                  top: surroundedPieceRow + rowOffset,
                  left: surroundedPieceCol + colOffset,
                });
                remainingGrid[rowIndex + surroundedPieceRow + rowOffset][
                  colIndex + surroundedPieceCol + colOffset
                ] = "";
              }
            }
          }
          pieceLevel++;
        }
        piecesData.push(pieceData);
      }
    }
  }
  const pieces = piecesData.map((data) => assemblePiece(data));
  return pieces;
}

export function gameInit({ useSaved, sortBy }) {
  // const savedState =
  //   useSaved ?? true
  //     ? JSON.parse(localStorage.getItem("jigsawState"))
  //     : undefined;

  // if (
  //   savedState &&
  //   savedState.hasOwnProperty("pool") &&
  //   savedState.hasOwnProperty("board") &&
  //   savedState.hasOwnProperty("hints") &&
  //   savedState.hasOwnProperty("hintindex") &&
  //   savedState.hasOwnProperty("sortBy") &&
  //   savedState.pool.length
  // ) {
  //   return savedState;
  // }

  const gridSize = 12;
  let pieceSize = 3;
  const minLetters = 40;
  const minWordLength = 4;
  const maxWordLength = 7;
  const grid = generateGrid({
    gridSize: gridSize,
    minLetters: minLetters,
    minWordLength: minWordLength,
    maxWordLength: maxWordLength,
  });

  console.log(JSON.stringify(grid));
  // const pieces = getPiecesFromBoard(grid, pieceSize);
  const pieces = makePieces(grid);
  const pieceData = pieces.map((piece, index) => ({
    letters: piece,
    id: index,
    boardTop: undefined,
    boardLeft: undefined,
    poolIndex: index,
  }));

  // let pieceData = []
  // let currentTop = gridSize - pieceSize;
  // let currentLeft = gridSize - pieceSize;
  // for (let pieceIndex = 0; pieceIndex < pieces.length; pieceIndex++) {
  //   const piece = {
  //     letters: pieces[pieceIndex],
  //     id: pieceIndex,
  //     boardTop: currentTop,
  //     boardLeft: currentLeft,
  //   }
  //   pieceData.push(piece)
  //   if (currentLeft === 0) {
  //     currentLeft = gridSize - pieceSize;
  //     currentTop = currentTop - pieceSize
  //   } else {
  //     currentLeft = currentLeft - pieceSize
  //   }
  // }

  //todo trim off excess whitespace row/col on edge
  return {
    pieces: pieceData,
    sortBy: sortBy,
    gridSize: gridSize, // todo any way to derive?
  };
}
