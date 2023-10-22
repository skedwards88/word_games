import { generateGrid } from "./generateGrid";

function getPiecesFromBoard(grid) {
  // todo
  return [
    [
      ["A", "B", ""],
      ["", "F", ""],
      ["", "C", ""]
    ],
    [
      ["Q", "B", ""],
      ["", "W", ""],
      ["", "", "E"]
    ],
    [
      ["Z", "B", ""],
      ["", "X", ""],
      ["", "T", ""]
    ],
    [
      ["M", "", ""],
      ["", "U", ""],
      ["", "", "P"]
    ],
  ];
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
  //   savedState.hasOwnProperty("hintIndex") &&
  //   savedState.hasOwnProperty("sortBy") &&
  //   savedState.pool.length
  // ) {
  //   return savedState;
  // }

  const gridSize = 12;
  const minLetters = 50;
  const minWordLength = 4;
  const maxWordLength = 7;
  const grid = generateGrid({
    gridSize: gridSize,
    minLetters: minLetters,
    minWordLength: minWordLength,
    maxWordLength: maxWordLength,
  });


  const pieces = getPiecesFromBoard(grid);

  return {
    board: [],
    sortBy: sortBy,
    pool: pieces,
  };
}
