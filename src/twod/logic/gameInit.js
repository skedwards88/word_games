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


function dispersePool(undispersedPool, endSize) {
  let dispersedPool = []
  for (let index = 0; index < undispersedPool.length; index += 1) {
    let section = Array(Math.floor(endSize / undispersedPool.length)).fill("")
    
    section[Math.floor(Math.random() * (section.length - 2))] = undispersedPool[index]
    dispersedPool = dispersedPool.concat(section)
  }
return dispersedPool
}

function partitionArray(array, partitionSize) {

  let partitioned = []
  for (let i = 0; i < array.length; i += partitionSize) {
    partitioned.push(array.slice(i, i + partitionSize))
  }
return partitioned
}

function padPool(pool, endDiameter) {
  // const full = Array(endDiameter * endDiameter).fill("")
  // const partitioned = partitionArray(pool, Math.sqrt(pool.length))
  // const padSize = endDiameter -  Math.sqrt(pool.length)
  // let padded = []
  // for (let i = 0; i < partitioned.length; i += 1) {
  //   padded = padded.concat(Array(3).fill("").concat(partitioned[i]).concat(Array(3).fill("")))
  // }
  // return padded
  // todo better centralize
  return Array(45).fill("").concat(pool).concat(Array(46).fill(""))
}

export function gameInit() {
  // todo pull grid size from settings
  const gridSize = 3;
  const solution = getGame(gridSize);
  const pool = padPool(shuffleArray(solution), 10)
  console.log(solution)

  return {
    solution: solution,
    board: Array(gridSize * gridSize).fill(""),
    pool: pool,
    locked: Array(gridSize * gridSize).fill(false),
  };
}
