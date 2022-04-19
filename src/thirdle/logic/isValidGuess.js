
import uncommonWords from "../../common/uncommonWords";
import commonWords from "../../common/commonWords";

export function isValidGuess({ word, pattern }) {
  
  const matchesPattern = word.match(pattern);

  if (!matchesPattern) {
    return false;
  }

  // The computer will build the pattern based on the common word list,
  // but the player may find any word
  const isWord = commonWords.includes(word) || uncommonWords.includes(word);

  return matchesPattern && isWord;
}
