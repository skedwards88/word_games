import { isKnown } from "../../common/isKnown";
import { gameInit } from "./gameInit";
import { checkIfNeighbors } from "../../common/checkIfNeighbors";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "newGame") {
    return gameInit(payload);
  }

  if (payload.action === "startWord") {
    let newLetterAvailabilities = [...currentGameState.letterAvailabilities];
    newLetterAvailabilities[currentGameState.letterIndex] = false;
    const newPlayedIndexes = [
      ...currentGameState.playedIndexes,
      payload.letterIndex,
    ];
    return {
      ...currentGameState,
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: newPlayedIndexes,
      result: "",
    };
  }

  if (payload.action === "addLetter") {
    console.log(JSON.stringify(currentGameState.playedIndexes));
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

    let newLetterAvailabilities = [...currentGameState.letterAvailabilities];
    newLetterAvailabilities[payload.letterIndex] = false;

    return {
      ...currentGameState,
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: newPlayedIndexes,
    };
  }

  if (payload.action === "endWord") {
    const newLetterAvailabilities = currentGameState.letters.map(() => true);

    // if the word is below the min length, don't add the word
    if (
      currentGameState.playedIndexes.length < currentGameState.minWordLength
    ) {
      return {
        ...currentGameState,
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: currentGameState.playedIndexes.length <= 1 ? "" : "Too short",
      };
    }

    // check if word is a real word
    const word = currentGameState.playedIndexes
      .map((index) => currentGameState.letters[index])
      .join("");
    const { isPartialWord, isWord, isEasy } = isKnown(word);
    if (!isWord) {
      console.log(`unknown word ${word}`);
      return {
        ...currentGameState,
        letterAvailabilities: newLetterAvailabilities,
        playedIndexes: [],
        result: "Unknown word",
      };
    }

    // check if the word matches a pattern
    const currentColors = currentGameState.playedIndexes
      .map((index) => currentGameState.colors[index])
      .join(" ");
    let clueMatches = [...currentGameState.clueMatches];

    for (let index = 0; index < currentGameState.clues.length; index++) {
      // go to the next iteration if we already have a match for the clue
      if (clueMatches[index]) {
        continue;
      }
      const comparisonClue = currentGameState.clues[index].join(" ");
      if (currentColors.includes(comparisonClue)) {
        clueMatches[index] = true;
      }
    }

    // Check if all matches found
    const newResult = clueMatches.every((i) => i) ? "game over" : "";

    return {
      ...currentGameState,
      letterAvailabilities: newLetterAvailabilities,
      playedIndexes: [],
      clueMatches: clueMatches,
      result: newResult,
    };
  }
}
