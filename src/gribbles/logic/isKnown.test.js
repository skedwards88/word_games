import { isKnown } from "./knownWords";

jest.mock('../../common/uncommonWords')
jest.mock('../../common/commonWords')

test("Unknown word", () => {
  const result = isKnown("CAT")
  const expected = {"isEasy": false, "isPartial": false, "isWord": false}

  expect(result).toEqual(expected);
});

test("Partial word", () => {
  const result = isKnown("CAM")
  const expected = {"isEasy": false, "isPartial": true, "isWord": false}

  expect(result).toEqual(expected);
});


test("Known uncommon word", () => {
  const result = isKnown("CAMPER")
  const expected = {"isEasy": false, "isPartial": true, "isWord": true}

  expect(result).toEqual(expected);
});

test("Known common word", () => {
  const result = isKnown("CAMP")
  const expected = {"isEasy": true, "isPartial": true, "isWord": true}

  expect(result).toEqual(expected);
});
