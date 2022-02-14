import { getScore } from "./getScore";
import knownWords from "./knownWords";

function getSurroundingIndexes({ index, gridSize }) {
  const column = index % gridSize;
  const row = Math.floor(index / gridSize);
  let surroundingIndexes = [];
  for (let currentRow = row - 1; currentRow <= row + 1; currentRow++) {
    for (
      let currentColumn = column - 1;
      currentColumn <= column + 1;
      currentColumn++
    ) {
      if (
        currentRow >= 0 &&
        currentColumn >= 0 &&
        currentRow < gridSize &&
        currentColumn < gridSize
      ) {
        const currentIndex = currentColumn + currentRow * gridSize;
        surroundingIndexes.push(currentIndex);
      }
    }
  }
  return surroundingIndexes;
}

function checkIfNeighbors({ prevPlayedIndex, playedIndex, flatList }) {
  if (!prevPlayedIndex) {
    return true;
  }
  const surroundingIndexes = getSurroundingIndexes({
    index: playedIndex,
    gridSize: Math.sqrt(flatList.length),
  });

  return surroundingIndexes.includes(prevPlayedIndex) ? true : false;
}

export function updateGameState(currentState, payload) {
  if (payload.action === "startWord") {
    const newWord = payload.letter;
    let newLetterAvailabilities = [...currentState.letterAvailabilities];
    newLetterAvailabilities[currentState.letterIndex] = false;
    const newPlayedIndexes = [
      ...currentState.playedIndexes,
      payload.letterIndex,
    ];
    return {
      ...currentState,
      currentWord: newWord,
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: newPlayedIndexes,
      result: "",
    };
  }

  if (payload.action === "addLetter") {
    const isNeighboring = checkIfNeighbors({
      prevPlayedIndex:
        currentState.playedIndexes[currentState.playedIndexes.length - 1],
      playedIndex: payload.letterIndex,
      flatList: currentState.letters,
    });

    if (!isNeighboring) {
      return currentState;
    }

    const newPlayedIndexes = [
      ...currentState.playedIndexes,
      payload.letterIndex,
    ];

    const newWord = (currentState.currentWord += payload.letter);
    let newLetterAvailabilities = [...currentState.letterAvailabilities];
    newLetterAvailabilities[payload.letterIndex] = false;
    return {
      ...currentState,
      currentWord: newWord,
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: newPlayedIndexes,
    };
  }

  if (payload.action === "endWord") {
    const newLetterAvailabilities = currentState.letters.map((i) => true);

    // if the word is below the min length, don't add the word
    if (currentState.currentWord.length < currentState.minLength) {
      return {
        ...currentState,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: "Too short",
      };
    }

    // if we already have the word, don't add the word
    if (currentState.foundWords.includes(currentState.currentWord)) {
      console.log("already found");
      return {
        ...currentState,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: "Already found",
      };
    }

    // check if word is a real word
    if (!knownWords.has(currentState.currentWord.toLowerCase())) {
      console.log(`unknown word ${currentState.currentWord}`);
      return {
        ...currentState,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: "Unknown word",
      };
    }

    const newFoundWords = [
      ...currentState.foundWords,
      currentState.currentWord,
    ];
    const wordScore = getScore(currentState.currentWord);
    return {
      ...currentState,
      foundWords: newFoundWords,
      score: currentState.score + wordScore,
      currentWord: "",
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: [],
    };
  }
}
