import { letterPool } from "../../common/letterPool";
import { shuffleArray } from "../../common/shuffleArray";
import { findAllWords } from "./findAllWords";

function getLetters(gridSize) {
  // Given the distribution of letters in the word list
  // Choose n letters without substitution
  const shuffledLetters = shuffleArray(letterPool);
  const chosenLetters = shuffledLetters.slice(0, gridSize * gridSize);

  return chosenLetters;
}

function getPlayableLetters({ gridSize, minWordLength, easyMode }) {
  // Select letters and make sure that the computer can find at least
  // 50 words (standard mode) or 20 words (easy mode)
  // otherwise the player will not be able to find many words
  const minWords = easyMode ? 20 : 50;
  let foundPlayableLetters = false;
  let letters;
  let allWords;
  while (!foundPlayableLetters) {
    //todo how to prevent infinite loop?
    letters = getLetters(gridSize);
    allWords = findAllWords({
      grid: letters,
      minWordLength: minWordLength,
      easyMode: easyMode,
    });
    console.log(`FOUND ${allWords.length}`);
    if (allWords.length > minWords) {
      foundPlayableLetters = true;
    }
  }
  return [letters, allWords];
}

export function gameInit({ gridSize, minWordLength, easyMode }) {
  // use the specified settings, otherwise check local storage, otherwise use default
  gridSize = gridSize || JSON.parse(localStorage.getItem("gridSize")) || 4;
  minWordLength =
    minWordLength || JSON.parse(localStorage.getItem("minWordLength")) || 3;
  easyMode = easyMode ?? JSON.parse(localStorage.getItem("easyMode")) ?? false;

  const [letters, allWords] = getPlayableLetters({
    gridSize: gridSize,
    minWordLength: minWordLength,
    easyMode: easyMode,
  });

  const letterAvailabilities = letters.map(() => true);

  return {
    foundWords: [],
    bonusWordCount: 0,
    currentWord: "",
    minWordLength: minWordLength,
    letters: letters,
    letterAvailabilities: letterAvailabilities,
    playedIndexes: [],
    result: "",
    allWords: allWords,
    easyMode: easyMode,
  };
}
