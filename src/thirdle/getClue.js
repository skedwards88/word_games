import { shuffleArray } from "../common/shuffleArray";
import commonWords from "../common/commonWords";
import { buildPattern } from "./buildPattern";

export function getClue() {
  let foundPlayable = false;
  let word;
  let pattern;
  let matches;
  let count = 0;

  while (!foundPlayable && count < 500) { //todo decide how to handle infinite loop
    console.log(count);
    count += 1;

    // Choose random word
    word = commonWords[Math.floor(Math.random() * commonWords.length)];
    if (word.length < 4) {
      continue;
    }

    // Choose 3 indexes from word
    const allIndexes = [...Array(word.length).keys()];
    // Shuffle indexes
    const shuffled = shuffleArray(allIndexes);
    // Take the first three
    const indexes = shuffled.slice(0, 3);

    pattern = buildPattern(indexes, word);

    matches = commonWords.filter((word) => word.match(pattern));

    if (matches.length > 10 && matches.length < 50) {
      foundPlayable = true;
    }
  }
  return { pattern: pattern, answers: matches.slice(0, 10) };
}