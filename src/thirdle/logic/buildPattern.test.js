import { buildPattern } from "./buildPattern";

// Single gaps

test("All indexes at word start (aaa.)", () => {
  const word = "ABCDEFG";
  const indexes = [0, 1, 2];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("^ABC[A-Z]+");
});

test("All indexes at word end (.aaa)", () => {
  const word = "ABCDEFG";
  const indexes = [4, 5, 6];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+EFG$");
});

test("starts with A, ends with AA (a.aa)", () => {
  const word = "ABCDEFG";
  const indexes = [0, 5, 6];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("^A[A-Z]+FG$");
});

test("starts with AA, ends with A (aa.a)", () => {
  const word = "ABCDEFG";
  const indexes = [0, 1, 6];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("^AB[A-Z]+G$");
});

// Double gaps

test(".a.aa", () => {
  const word = "ABCDEFG";
  const indexes = [2, 5, 6];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+C[A-Z]+FG$");
});

test(".aa.a", () => {
  const word = "ABCDEFG";
  const indexes = [2, 3, 6];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+CD[A-Z]+G$");
});

test(".aaa.", () => {
  const word = "ABCDEFG";
  const indexes = [2, 3, 4];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+CDE[A-Z]+");
});

test("a.a.a", () => {
  const word = "ABCDEFG";
  const indexes = [0, 3, 6];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("^A[A-Z]+D[A-Z]+G$");
});

test("a.aa.", () => {
  const word = "ABCDEFG";
  const indexes = [0, 3, 4];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("^A[A-Z]+DE[A-Z]+");
});

test("aa.a.", () => {
  const word = "ABCDEFG";
  const indexes = [0, 1, 4];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("^AB[A-Z]+E[A-Z]+");
});

// Triple gaps

test(".a.a.a", () => {
  const word = "ABCDEFG";
  const indexes = [1, 3, 6];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+B[A-Z]+D[A-Z]+G$");
});

test(".a.aa.", () => {
  const word = "ABCDEFG";
  const indexes = [1, 3, 4];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+B[A-Z]+DE[A-Z]+");
});

test("a.a.a.", () => {
  const word = "ABCDEFG";
  const indexes = [0, 3, 5];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("^A[A-Z]+D[A-Z]+F[A-Z]+");
});

test(".aa.a.", () => {
  const word = "ABCDEFG";
  const indexes = [2, 3, 5];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+CD[A-Z]+F[A-Z]+");
});

// Quadruple gaps

test(".a.a.a.", () => {
  const word = "ABCDEFG";
  const indexes = [1, 3, 5];
  const pattern = buildPattern(indexes, word);
  expect(pattern).toEqual("[A-Z]+B[A-Z]+D[A-Z]+F[A-Z]+");
});
