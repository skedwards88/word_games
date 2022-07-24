import { generateGrid } from "./generateGrid";

function getPiecesFromBoard(grid) {
  // todo
  return [
    ["A","B","","","","","","",""],
    ["W","X","","Y","","","Z","",""],
    // ["","","","C","D","E","","Q",""],
    // ["","","","C","D","E","","Q",""],
    // ["A","B","C","Z","","","","",""]
  ]
}

export function gameInit({ useSaved, sortBy }) {
  const savedState =
    useSaved ?? true
      ? JSON.parse(localStorage.getItem("jigsawState"))
      : undefined;

  if (
    savedState &&
    savedState.hasOwnProperty("pool") &&
    savedState.hasOwnProperty("board") &&
    savedState.hasOwnProperty("hints") &&
    savedState.hasOwnProperty("hintIndex") &&
    savedState.hasOwnProperty("sortBy") &&
    savedState.pool.length
  ) {
    return savedState;
  }

  const gridSize = 9;
  const minLetters = 25;
  const minWordLength = 4;
  const maxWordLength = 7;
  const grid = generateGrid({
    gridSize: gridSize,
    minLetters: minLetters,
    minWordLength: minWordLength,
    maxWordLength: maxWordLength,
  });


  const pieces = getPiecesFromBoard(grid)

  console.log(pieces)
  return {
    board: [
      ["P","P","","S","","","Z","",""]
    ],
    sortBy: sortBy,

    pool: pieces,
  };
}
