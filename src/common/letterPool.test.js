import { getLetterPool } from "./letterPool";
import {commonWords, uncommonWords} from "@skedwards88/word_lists";

jest.mock('@skedwards88/word_lists')

test("All letters represented in pool, except for Q (is Qu)", () => {
  const pool = getLetterPool();
  const letters = commonWords.concat(uncommonWords).join("").split("");

  const missingLetters = letters.filter((letter) => !pool.includes(letter));

  expect(missingLetters).toEqual(["Q"]);
  expect(pool.includes("Qu")).toEqual(true);
});

test("Pool adds up to ~100", () => {
  const pool = getLetterPool();
  expect(pool.length).toBeGreaterThan(90);
  expect(pool.length).toBeLessThan(110);
});
