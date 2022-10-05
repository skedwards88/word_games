import { shuffleArray } from "../../common/shuffleArray";
import commonWords from "../../common/wordLists/compiled/commonWords.json";
import { buildPattern } from "./buildPattern";

export function getClue() {
  let foundPlayable = false;
  let pattern;
  let matches;
  let count = 0;

  while (!foundPlayable && count < 500) {
    //todo decide how to handle infinite loop
    count += 1;

    // Choose random word of length > 3
    const word = commonWords[Math.floor(Math.random() * commonWords.length)];
    if (word.length < 4) {
      continue;
    }

    // Choose 3 indexes from word
    const allIndexes = [...Array(word.length).keys()];
    const shuffled = shuffleArray(allIndexes);
    const indexes = shuffled.slice(0, 3);

    // Get the regex that matches the 3 selected letters within the word
    pattern = buildPattern(indexes, word);

    // Find all words that match the pattern
    matches = commonWords.filter((word) => word.match(pattern));

    // To make sure the pattern isn't too easy or too hard
    if (matches.length > 10 && matches.length < 50) {
      foundPlayable = true;
    }
  }

  return { pattern: pattern, answers: matches.slice(0, 10) };
}
