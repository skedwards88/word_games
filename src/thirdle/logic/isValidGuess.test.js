import { isValidGuess } from "./isValidGuess";

jest.mock("../../common/wordLists/compiled/uncommonWords.json");
jest.mock("../../common/wordLists/compiled/commonWords.json");

test("word matches pattern and is known word", () => {
  expect(isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+ERS$" })).toEqual(
    true
  );
  expect(isValidGuess({ word: "CAMPERS", pattern: "^C[A-Z]+RS$" })).toEqual(
    true
  );
  expect(isValidGuess({ word: "CAMPERS", pattern: "^CA[A-Z]+S$" })).toEqual(
    true
  );
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+M[A-Z]+RS$" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+MP[A-Z]+S$" })
  ).toEqual(true);
  expect(isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+MPE[A-Z]+" })).toEqual(
    true
  );
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "^C[A-Z]+P[A-Z]+S$" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "^C[A-Z]+PE[A-Z]+" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "^CA[A-Z]+E[A-Z]+" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+A[A-Z]+P[A-Z]+S$" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+A[A-Z]+PE[A-Z]+" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "^C[A-Z]+P[A-Z]+R[A-Z]+" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+MP[A-Z]+R[A-Z]+" })
  ).toEqual(true);
  expect(
    isValidGuess({ word: "CAMPERS", pattern: "[A-Z]+A[A-Z]+P[A-Z]+R[A-Z]+" })
  ).toEqual(true);
});

test("word matches pattern and is not known word", () => {
  expect(
    isValidGuess({ word: "CAMPERZ", pattern: "[A-Z]+A[A-Z]+P[A-Z]+R[A-Z]+" })
  ).toEqual(false);
});

test("word does not match pattern and is known word", () => {
  expect(isValidGuess({ word: "CAMPERVANS", pattern: "[A-Z]+ERS$" })).toEqual(
    false
  );
  expect(isValidGuess({ word: "CAMPERVANS", pattern: "^C[A-Z]+RS$" })).toEqual(
    false
  );
  expect(isValidGuess({ word: "CAMPER", pattern: "^CA[A-Z]+S$" })).toEqual(
    false
  );
  expect(
    isValidGuess({ word: "CAMPERVANS", pattern: "[A-Z]+M[A-Z]+RS$" })
  ).toEqual(false);
  expect(isValidGuess({ word: "CAMPER", pattern: "[A-Z]+MP[A-Z]+S$" })).toEqual(
    false
  );
  expect(
    isValidGuess({ word: "HAPPINESS", pattern: "[A-Z]+MPE[A-Z]+" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "CAMPER", pattern: "^C[A-Z]+P[A-Z]+S$" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "SCAMPERS", pattern: "^C[A-Z]+PE[A-Z]+" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "SCAMPERS", pattern: "^CA[A-Z]+E[A-Z]+" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "CAMPER", pattern: "[A-Z]+A[A-Z]+P[A-Z]+S$" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "HAPPINESS", pattern: "[A-Z]+A[A-Z]+PE[A-Z]+" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "CAMPER", pattern: "^C[A-Z]+P[A-Z]+R[A-Z]+" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "CAMPER", pattern: "[A-Z]+MP[A-Z]+R[A-Z]+" })
  ).toEqual(false);
  expect(
    isValidGuess({ word: "HAPPINESS", pattern: "[A-Z]+A[A-Z]+P[A-Z]+R[A-Z]+" })
  ).toEqual(false);
});
