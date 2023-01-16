import { isKnown } from "./isKnown";

jest.mock('@skedwards88/word_lists', () => {
  return {
    commonWords: ["WALK", "CAMP", "QUIET", "LET"],
    uncommonWords: [
      "NATURE",
      "CAMPERS",
      "SOLITUDE",
      "HAPPINESS",
      "CAMPERVANS",
      "SCAMPER",
      "SCAMPERS",
      "CAMPER"
    ],
  }
})

test("Unknown word", () => {
  const result = isKnown("CAT");
  const expected = { isEasy: false, isPartial: false, isWord: false };

  expect(result).toEqual(expected);
});

test("Partial word", () => {
  const result = isKnown("CAM");
  const expected = { isEasy: false, isPartial: true, isWord: false };

  expect(result).toEqual(expected);
});

test("Known uncommon word", () => {
  const result = isKnown("CAMPER");
  const expected = { isEasy: false, isPartial: true, isWord: true };

  expect(result).toEqual(expected);
});

test("Known common word", () => {
  const result = isKnown("CAMP");
  const expected = { isEasy: true, isPartial: true, isWord: true };

  expect(result).toEqual(expected);
});
