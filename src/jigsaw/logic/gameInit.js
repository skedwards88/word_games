import { generateGrid } from "./generateGrid";

function getPiecesFromBoard(grid) {
  // todo
  return [
    [
      ["A", "B", ""],
      ["", "F", ""],
      ["", "C", ""],
    ],
    [
      ["Q", "B", ""],
      ["", "W", ""],
      ["", "", "E"],
    ],
    [
      ["Z", "B", ""],
      ["", "X", ""],
      ["", "T", ""],
    ],
    [
      ["M", "", ""],
      ["", "U", ""],
      ["", "", "P"],
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

  //todo trim off excess whitespace row/col on edge
  return {
    pieces: [
      {
        id: 0,
        letters: [
          ["Z", "Z", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        boardTop: 3,
        boardLeft: 3,
        poolIndex: undefined,
      },
      {
        id: 1,
        letters: [
          ["A", "", ""],
          ["", "A", ""],
          ["", "A", "A"],
        ],
        boardTop: 0,
        boardLeft: 0,
        poolIndex: undefined,
      },
      {
        id: 2,
        letters: [
          ["", "", ""],
          ["", "B", ""],
          ["", "B", ""],
        ],
        boardTop: 0,
        boardLeft: 4,
        poolIndex: undefined,
      },
      {
        id: 3,
        letters: [
          ["C", "", ""],
          ["", "C", "C"],
          ["", "C", ""],
        ],
        boardTop: undefined,
        boardLeft: undefined,
        poolIndex: 0,
      },
      {
        id: 4,
        letters: [
          ["D", "D", ""],
          ["", "D", "D"],
          ["", "", ""],
        ],
        boardTop: undefined,
        boardLeft: undefined,
        poolIndex: 1,
      },
      {
        id: 5,
        letters: [
          ["E", "E", ""],
          ["", "E", ""],
          ["", "E", "E"],
        ],
        boardTop: undefined,
        boardLeft: undefined,
        poolIndex: 2,
      },
    ],
    sortBy: sortBy,
    gridSize: gridSize, // todo any way to derive?
  };
}
