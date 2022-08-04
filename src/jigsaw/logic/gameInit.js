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

  //todo trim off excess whitespace row/col on edge
  return {
    board: [
      {
        letters: [
          ["A","",""],
          ["","A","C"],
          ["","A","B"],
        ],
        top: 0,
        left: 0,
      },
            {
        letters: [
          ["","",""],
          ["","A",""],
          ["","B",""],
        ],
        top: 0,
        left: 4,
      },
    ],
    sortBy: sortBy,
    pool: pieces,
    gridSize: gridSize, // todo any way to derive?
  };
}
