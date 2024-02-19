import {isKnown} from "../../common/isKnown";

export function isValidGuess({word, pattern}) {
  const matchesPattern = word.match(pattern);

  if (!matchesPattern) {
    return false;
  }

  // The computer will build the pattern based on the common word list,
  // but the player may find any word
  const {isWord} = isKnown(word);

  return matchesPattern && isWord;
}
