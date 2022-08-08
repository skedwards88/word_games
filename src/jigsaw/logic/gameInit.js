import { generateGrid } from "./generateGrid";
import { partitionArray } from "../../common/partitionArray";
import { shuffleArray } from "../../common/shuffleArray";

function getPiecesFromBoard(grid) {
  console.log(JSON.stringify(grid))
  // break the board into 3x3 subgrids
  const partitionSize = 3;
  const partitionedRows = grid.map((row) => partitionArray(row, partitionSize));
  let pieces = [];
  for (
    let startRow = 0;
    startRow <= partitionedRows.length - partitionSize;
    startRow = startRow + partitionSize
  ) {
    for (
      let colIndex = 0;
      colIndex < partitionedRows[startRow].length;
      colIndex++
    ) {
      let piece = [];
      for (
        let rowIndex = startRow;
        rowIndex < startRow + partitionSize;
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

  const gridSize = 9;
  const minLetters = 20;
  const minWordLength = 4;
  const maxWordLength = 7;
  const grid = generateGrid({
    gridSize: gridSize,
    minLetters: minLetters,
    minWordLength: minWordLength,
    maxWordLength: maxWordLength,
  });

  const pieces = getPiecesFromBoard(grid);

  const pieceData = pieces.map((piece, index) => ({
    letters: piece,
    id: index,
    boardTop: undefined,
    boardLeft: undefined,
    poolIndex: index,
  }));

  //todo trim off excess whitespace row/col on edge
  return {
    // pieces: [
    //   {
    //     id: 0,
    //     letters: [
    //       ["Z", "Z", ""],
    //       ["", "", ""],
    //       ["", "", ""],
    //     ],
    //     boardTop: 3,
    //     boardLeft: 3,
    //     poolIndex: undefined,
    //   },
    //   {
    //     id: 1,
    //     letters: [
    //       ["A", "", ""],
    //       ["", "A", ""],
    //       ["", "A", "A"],
    //     ],
    //     boardTop: 0,
    //     boardLeft: 0,
    //     poolIndex: undefined,
    //   },
    //   {
    //     id: 2,
    //     letters: [
    //       ["", "", ""],
    //       ["", "B", ""],
    //       ["", "B", ""],
    //     ],
    //     boardTop: 0,
    //     boardLeft: 4,
    //     poolIndex: undefined,
    //   },
    //   {
    //     id: 3,
    //     letters: [
    //       ["C", "", ""],
    //       ["", "C", "C"],
    //       ["", "C", ""],
    //     ],
    //     boardTop: undefined,
    //     boardLeft: undefined,
    //     poolIndex: 0,
    //   },
    //   {
    //     id: 4,
    //     letters: [
    //       ["D", "D", ""],
    //       ["", "D", "D"],
    //       ["", "", ""],
    //     ],
    //     boardTop: undefined,
    //     boardLeft: undefined,
    //     poolIndex: 1,
    //   },
    //   {
    //     id: 5,
    //     letters: [
    //       ["E", "E", ""],
    //       ["", "E", ""],
    //       ["", "E", "E"],
    //     ],
    //     boardTop: undefined,
    //     boardLeft: undefined,
    //     poolIndex: 2,
    //   },
    // ],
    pieces: pieceData,
    sortBy: sortBy,
    gridSize: gridSize, // todo any way to derive?
  };
}
