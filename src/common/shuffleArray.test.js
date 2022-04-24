import { shuffleArray } from "./shuffleArray";

test("the shuffled array contains the same items", () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);

  expect(original.sort()).toEqual(shuffled.sort());
});

test("the shuffled array is not the same order", () => {
  // This could be a flaky test.
  // Making a larger array or having multiple calls
  // would make that less likely.
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffleArray(original);

  expect(original).not.toEqual(shuffled);
});
