import { getScore } from "./getScore";

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
    };
  }

  if (payload.action === "addLetter") {
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
      };
    }

    // todo check if word is a real word

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