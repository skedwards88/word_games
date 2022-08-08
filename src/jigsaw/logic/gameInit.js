import { generateGrid } from "./generateGrid";
import { partitionArray } from "../../common/partitionArray";
import { shuffleArray } from "../../common/shuffleArray";

function getPiecesFromBoard(grid, pieceSize) {
  console.log(JSON.stringify(grid))
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
        pieces.push(piece);
      }
    }
  }
  console.log(`${grid.flatMap(i=>i).join("").length} - ${pieces.flatMap(i=>i.flatMap(i=>i)).join("").length}`)
  return shuffleArray(pieces);
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

  const pieces = getPiecesFromBoard(grid, pieceSize);

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
