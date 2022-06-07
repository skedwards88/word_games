import commonWords from "../../common/wordLists/compiled/commonWords.json";
import { shuffleArray } from "../../common/shuffleArray.js";

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
      console.log(game);
    }
  }
  return game.join("").split("");
}

export function gameInit() {
  // todo pull grid size from settings
  const gridSize = 3;
  const solution = getGame(gridSize);
  console.log(solution);

  // const shuffledSolution = ["1","2","3","4","5","6","7","8","9","10","11","12","13","1","2"]
  const shuffledSolution = shuffleArray(solution);
  const root = Math.floor(Math.sqrt(shuffledSolution.length));
  const startingX = 50;
  const startingY = 70;
  const pool = [];
  for (let index = 0; index < shuffledSolution.length; index++) {
    const xOffsetFactor = Math.floor(index / root) - Math.floor((root - 1) / 2);
    const yOffsetFactor = (index % root) - Math.floor((root - 1) / 2);
    console.log(
      `${xOffsetFactor}, ${yOffsetFactor}; ${xOffsetFactor * 5}, ${
        yOffsetFactor * 5
      }`
    );
    const obj = new Object({
      letter: shuffledSolution[index],
      x: `${xOffsetFactor * 8 + startingX}vw`,
      y: `${yOffsetFactor * 8 + startingY}vh`, //todo better center
    });
    pool.push(obj);
  }

  return {
    solution: solution,
    board: Array(gridSize * gridSize).fill(""),
    pool: pool,
    locked: Array(gridSize * gridSize).fill(false),
  };
}
