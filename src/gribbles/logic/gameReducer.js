import { isKnown } from "../../common/isKnown";
import { gameInit } from "./gameInit";
import { checkIfNeighbors } from "../../common/checkIfNeighbors";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "newGame") {
    return gameInit(payload);
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
      indexA:
        currentGameState.playedIndexes[
          currentGameState.playedIndexes.length - 1
        ],
      indexB: payload.letterIndex,
      gridSize: Math.sqrt(currentGameState.letters.length),
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

    // If playing in easy mode
    // and the word isn't in the easy word list,
    // consider it a bonus
    const newBonusWordCount =
      !isEasy && currentGameState.easyMode
        ? currentGameState.bonusWordCount + 1
        : currentGameState.bonusWordCount;

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
      bonusWordCount: newBonusWordCount,
    };
  }
}
