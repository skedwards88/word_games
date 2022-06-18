import commonWords from "../../common/wordLists/compiled/commonWords.json";
import { shuffleArray } from "../../common/shuffleArray.js";
import { getPositionalFractions } from "./getOffsets";

function getTrieOfLength(wordLength) {
  let trie = {};
  for (let word of commonWords) {
    if (word.length !== wordLength) {
      continue;
    }
    let current = trie;
    for (let letter of word) {
      if (!current[letter]) {
        current[letter] = {};
      }
      current = current[letter];
    }
    current["endOfWord"] = true;
  }
  return trie;
}

const trieOfThree = getTrieOfLength(3);
const trieOfFour = getTrieOfLength(4);

function getWordThatStartsWith(wordLength, starting = "") {
  let choices;
  if (wordLength === 3) {
    choices = trieOfThree;
  } else if (wordLength === 4) {
    choices = trieOfFour;
  }

  let chosen = starting;

  for (let index = 0; index < starting.length; index++) {
    choices = choices[starting[index]];
    if (!choices) {
      return;
    }
  }

  while (!choices["endOfWord"]) {
    const possibleKeys = Object.keys(choices);
    const randomKey =
      possibleKeys[Math.floor(Math.random() * possibleKeys.length)];
    choices = choices[randomKey];
    chosen += randomKey;
  }
  return chosen;
}

function attemptToGetGame(gridSize) {
  let words = [];
  for (let index = 0; index < gridSize; index++) {
    let word;
    // row
    word = getWordThatStartsWith(gridSize, words[index]);
    if (word) {
      words[index] = word;
    } else {
      // return if could't find a word to fit
      return;
    }
    // col
    word = getWordThatStartsWith(
      gridSize,
      words.map((word) => word[index]).join("")
    );
    if (word) {
      for (let subIndex = index + 1; subIndex < gridSize; subIndex++) {
        const currentWord = words[subIndex] ? words[subIndex] : "";
        words[subIndex] = currentWord + word[subIndex];
      }
    } else {
      // return if could't find a word to fit
      return;
    }
  }
  return words;
}

function getGame(gridSize) {
  let count = 0;
  let found = false;
  let game;
  while (!found) {
    count += 1;
    console.log(`round ${count}`);
    game = attemptToGetGame(gridSize);
    if (game) {
      found = true;
    }
  }
  return game.join("").split("");
}

export function gameInit({ useSaved }) {
  const savedState =
    useSaved ?? true
      ? JSON.parse(localStorage.getItem("packedState"))
      : undefined;

  if (
    savedState &&
    savedState.hasOwnProperty("solution") &&
    savedState.hasOwnProperty("board") &&
    savedState.hasOwnProperty("pool") &&
    savedState.hasOwnProperty("locked") &&
    savedState.board.some((i) => !i)
  ) {
    return savedState;
  }

  const gridSize = 3;
  const solution = getGame(gridSize);

  const positions = getPositionalFractions(solution, solution.length);

  const pool = shuffleArray(solution).map(
    (letter, index) =>
      new Object({
        letter: letter,
        xFractionalPosition: positions[index].x,
        yFractionalPosition: positions[index].y,
      })
  );

  return {
    solution: solution,
    board: Array(gridSize * gridSize).fill(""),
    pool: pool,
    locked: Array(gridSize * gridSize).fill(false),
  };
}
