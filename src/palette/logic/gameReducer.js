import { isKnown } from "../../common/isKnown";
import { gameInit } from "./gameInit";
import { checkIfNeighbors } from "../../common/checkIfNeighbors";
import { arraysMatchQ } from "./arraysMatchQ";

export function gameReducer(currentGameState, payload) {
  if (payload.action === "newGame") {
    return gameInit(false);
  }

  if (payload.action === "hint") {
    let newHintLevel = currentGameState.hintLevel + 1;

    // If the hit level exceeds the length of any of the clues, that clue is fully solved
    // gameState.clueMatches.every((i) => i)
    const currentClueMatches = currentGameState.clueMatches;
    const currentClueIndexes = currentGameState.clueIndexes;
    let newClueMatches = [];
    for (let index = 0; index < currentClueIndexes.length; index++) {
      // If the clue is already matched, skip
      if (currentClueMatches[index]) {
        newClueMatches.push(currentClueMatches[index]);
        continue;
      }

      if (newHintLevel >= currentClueIndexes[index].length) {
        newClueMatches.push(true);
      } else {
        newClueMatches.push(false);
      }
    }

    return {
      ...currentGameState,
      hintLevel: newHintLevel,
      clueMatches: newClueMatches,
    };
  }

  if (payload.action === "startWord") {
    const newPlayedIndexes = [
      ...currentGameState.playedIndexes,
      payload.letterIndex,
    ];
    return {
      ...currentGameState,
      playedIndexes: newPlayedIndexes,
    };
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
    };
  }

  if (payload.action === "endWord") {
    // if the word is below the min length, don't add the word
    if (
      currentGameState.playedIndexes.length < currentGameState.minWordLength
    ) {
      console.log("too short");
      return {
        ...currentGameState,
        playedIndexes: [],
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
        playedIndexes: [],
      };
    }

    // check if the word matches a pattern
    const currentColors = currentGameState.playedIndexes.map(
      (index) => currentGameState.colors[index]
    );
    let clueMatches = [...currentGameState.clueMatches];
    let clueIndexes = currentGameState.clueIndexes.map((indexes) => [
      ...indexes,
    ]);
    for (
      let clueIndex = 0;
      clueIndex < currentGameState.clueIndexes.length;
      clueIndex++
    ) {
      // go to the next iteration if we already have a match for the clue
      if (clueMatches[clueIndex]) {
        continue;
      }
      const comparisonColors = currentGameState.clueIndexes[clueIndex].map(
        (index) => currentGameState.colors[index]
      );
      if (arraysMatchQ(currentColors, comparisonColors)) {
        // If we found a match, indicate that the match is found
        // And also replace the clue letters with the found word
        clueMatches[clueIndex] = true;
        clueIndexes[clueIndex] = currentGameState.playedIndexes;

        // there will only be one match, so exit early if we find one
        break;
      }
    }

    return {
      ...currentGameState,
      playedIndexes: [],
      clueMatches: clueMatches,
      clueIndexes: clueIndexes,
    };
  }
}
