import { isKnown } from "./knownWords";
import { getInitialGameState } from "./getInitialGameState";

export function getSurroundingIndexes({ index, gridSize }) {
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

export function updateGameState(currentGameState, payload) {
  if (payload.action === "newGame") {
    return getInitialGameState(payload);
  }

  if (payload.action === "startWord") {
    const newWord = payload.letter.toUpperCase();
    let newLetterAvailabilities = [...currentGameState.letterAvailabilities];
    newLetterAvailabilities[currentGameState.letterIndex] = false;
    const newPlayedIndexes = [
      ...currentGameState.playedIndexes,
      payload.letterIndex,
    ];
    return {
      ...currentGameState,
      currentWord: newWord,
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: newPlayedIndexes,
      result: "",
    };
  }

  if (payload.action === "addLetter") {
    const isNeighboring = checkIfNeighbors({
      prevPlayedIndex:
        currentGameState.playedIndexes[
          currentGameState.playedIndexes.length - 1
        ],
      playedIndex: payload.letterIndex,
      flatList: currentGameState.letters,
    });

    if (!isNeighboring) {
      return currentGameState;
    }

    const newPlayedIndexes = [
      ...currentGameState.playedIndexes,
      payload.letterIndex,
    ];

    const newWord = (currentGameState.currentWord +=
      payload.letter.toUpperCase());
    let newLetterAvailabilities = [...currentGameState.letterAvailabilities];
    newLetterAvailabilities[payload.letterIndex] = false;
    return {
      ...currentGameState,
      currentWord: newWord,
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: newPlayedIndexes,
    };
  }

  if (payload.action === "endWord") {
    const newLetterAvailabilities = currentGameState.letters.map(() => true);

    // if the word is below the min length, don't add the word
    if (currentGameState.currentWord.length < currentGameState.minWordLength) {
      return {
        ...currentGameState,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: currentGameState.currentWord.length <= 1 ? "" : "Too short",
      };
    }

    // if we already have the word, don't add the word
    if (currentGameState.foundWords.includes(currentGameState.currentWord)) {
      console.log("already found");
      return {
        ...currentGameState,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: "Already found",
      };
    }

    // check if word is a real word
    const { isPartialWord, isWord, isEasy } = isKnown(
      currentGameState.currentWord.toUpperCase()
    );
    if (!isWord) {
      console.log(`unknown word ${currentGameState.currentWord}`);
      return {
        ...currentGameState,
        currentWord: "",
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: "Unknown word",
      };
    }

    const newFoundWords = [
      ...currentGameState.foundWords,
      currentGameState.currentWord,
    ];
    return {
      ...currentGameState,
      foundWords: newFoundWords,
      currentWord: "",
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: [],
    };
  }
}
