import {beautifyPattern} from "./beautifyPattern";

test("^ABC[A-Z]+", () => {
  const pattern = "^ABC[A-Z]+";
  const expected = "ABC...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+EFG$", () => {
  const pattern = "[A-Z]+EFG$";
  const expected = "...EFG";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("^A[A-Z]+FG$", () => {
  const pattern = "^A[A-Z]+FG$";
  const expected = "A...FG";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("^AB[A-Z]+G$", () => {
  const pattern = "^AB[A-Z]+G$";
  const expected = "AB...G";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+C[A-Z]+FG$", () => {
  const pattern = "[A-Z]+C[A-Z]+FG$";
  const expected = "...C...FG";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+CD[A-Z]+G$", () => {
  const pattern = "[A-Z]+CD[A-Z]+G$";
  const expected = "...CD...G";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+CDE[A-Z]+", () => {
  const pattern = "[A-Z]+CDE[A-Z]+";
  const expected = "...CDE...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("^A[A-Z]+D[A-Z]+G$", () => {
  const pattern = "^A[A-Z]+D[A-Z]+G$";
  const expected = "A...D...G";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("^A[A-Z]+DE[A-Z]+", () => {
  const pattern = "^A[A-Z]+DE[A-Z]+";
  const expected = "A...DE...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("^AB[A-Z]+E[A-Z]+", () => {
  const pattern = "^AB[A-Z]+E[A-Z]+";
  const expected = "AB...E...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+B[A-Z]+D[A-Z]+G$", () => {
  const pattern = "[A-Z]+B[A-Z]+D[A-Z]+G$";
  const expected = "...B...D...G";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+B[A-Z]+DE[A-Z]+", () => {
  const pattern = "[A-Z]+B[A-Z]+DE[A-Z]+";
  const expected = "...B...DE...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("^A[A-Z]+D[A-Z]+F[A-Z]+", () => {
  const pattern = "^A[A-Z]+D[A-Z]+F[A-Z]+";
  const expected = "A...D...F...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+CD[A-Z]+F[A-Z]+", () => {
  const pattern = "[A-Z]+CD[A-Z]+F[A-Z]+";
  const expected = "...CD...F...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});

test("[A-Z]+B[A-Z]+D[A-Z]+F[A-Z]+", () => {
  const pattern = "[A-Z]+B[A-Z]+D[A-Z]+F[A-Z]+";
  const expected = "...B...D...F...";
  const actual = beautifyPattern(pattern);
  expect(actual).toEqual(expected);
});
