import { findAllWords } from "./findAllWords";

jest.mock("../../common/commonWords");
jest.mock("../../common/uncommonWords");

test("Easy mode, min length 4", () => {
  const grid = [
    "O",
    "C",
    "QU",
    "I",
    "S",
    "A",
    "E",
    "T",
    "P",
    "M",
    "L",
    "T",
    "P",
    "E",
    "R",
    "K",
  ];
  const foundWords = findAllWords({
    grid: grid,
    minWordLength: 4,
    easyMode: true,
  });
  const expected = ["CAMP", "QUIET"];

  expect(foundWords).toEqual(expect.arrayContaining(expected));
  expect(foundWords.length).toEqual(expected.length);
});

test("Hard mode, min length 4", () => {
  const grid = [
    "O",
    "C",
    "QU",
    "I",
    "S",
    "A",
    "E",
    "T",
    "P",
    "M",
    "L",
    "T",
    "P",
    "E",
    "R",
    "K",
  ];
  const foundWords = findAllWords({
    grid: grid,
    minWordLength: 4,
    easyMode: false,
  });

  const expected = ["CAMP", "QUIET", "CAMPER", "SCAMPER"];

  expect(foundWords).toEqual(expect.arrayContaining(expected));
  expect(foundWords.length).toEqual(expected.length);
});

test("Easy mode, min length 3", () => {
  const grid = [
    "O",
    "C",
    "QU",
    "I",
    "S",
    "A",
    "E",
    "T",
    "P",
    "M",
    "L",
    "T",
    "P",
    "E",
    "R",
    "K",
  ];
  const foundWords = findAllWords({
    grid: grid,
    minWordLength: 3,
    easyMode: true,
  });

  const expected = ["CAMP", "QUIET", "LET"];

  expect(foundWords).toEqual(expect.arrayContaining(expected));
  expect(foundWords.length).toEqual(expected.length);
});

test("Hard mode, min length 3", () => {
  const grid = [
    "O",
    "C",
    "QU",
    "I",
    "S",
    "A",
    "E",
    "T",
    "P",
    "M",
    "L",
    "T",
    "P",
    "E",
    "R",
    "K",
  ];
  const foundWords = findAllWords({
    grid: grid,
    minWordLength: 3,
    easyMode: false,
  });

  const expected = ["CAMP", "QUIET", "CAMPER", "SCAMPER", "LET"];

  expect(foundWords).toEqual(expect.arrayContaining(expected));
  expect(foundWords.length).toEqual(expected.length);
});
