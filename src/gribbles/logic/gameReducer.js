import { isKnown } from "../../common/isKnown";
import { gameInit } from "./gameInit";
import { checkIfNeighbors } from "../../common/checkIfNeighbors";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "newGame") {
    return gameInit(payload);
  }

  if (payload.action === "addLetter") {
    // Don't add the letter if it isn't neighboring the current sequence
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

    return {
      ...currentGameState,
      playedIndexes: newPlayedIndexes,
      result: "",
    };
  }

  if (payload.action === "endWord") {
    const newWord = currentGameState.playedIndexes
      .map((index) => currentGameState.letters[index])
      .join("")
      .toUpperCase();

    // if the word is below the min length, don't add the word
    if (newWord.length < currentGameState.minWordLength) {
      return {
        ...currentGameState,
        playedIndexes: [],
        result: currentGameState.playedIndexes.length <= 1 ? "" : "Too short",
      };
    }

    // if we already have the word, don't add the word
    if (currentGameState.foundWords.includes(newWord)) {
      console.log("already found");
      return {
        ...currentGameState,
        playedIndexes: [],
        result: "Already found",
      };
    }

    // check if word is a real word
    const { isWord, isEasy } = isKnown(newWord);
    if (!isWord) {
      console.log(`unknown word ${newWord}`);
      return {
        ...currentGameState,
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

    const newFoundWords = [...currentGameState.foundWords, newWord];
    return {
      ...currentGameState,
      foundWords: newFoundWords,
      playedIndexes: [],
      bonusWordCount: newBonusWordCount,
    };
  }
}
