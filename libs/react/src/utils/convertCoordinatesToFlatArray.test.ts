import { expect, test } from "vitest";
import convertCoordinatesToFlatArray, {
  isFlatArray,
  is2DArray,
} from "./convertCoordinatesToFlatArray";

test("isFlatArray", () => {
  expect(isFlatArray([1, 2, 3])).toBe(true);
  expect(
    isFlatArray([
      [1, 2],
      [3, 4],
    ])
  ).toBe(false);
});

test("is2DArray", () => {
  expect(
    is2DArray([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ])
  ).toBe(true);
  expect(is2DArray([1, 2, 3])).toBe(false);
  expect(
    is2DArray([
      [1, 2],
      [3, 4],
    ])
  ).toBe(false);
});

test("convertCoordinatesToFlatArray", () => {
  expect(
    convertCoordinatesToFlatArray([
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ])
  ).toEqual([1, 2, 3, 4]);
  expect(convertCoordinatesToFlatArray([1, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  expect(
    convertCoordinatesToFlatArray([
      [1, 2],
      [3, 4],
    ])
  ).toEqual([1, 2, 3, 4]);
  expect(() => convertCoordinatesToFlatArray([1, 2, 3])).toThrow(
    "Unexpected number of points in the response, unable to translate as 2D points"
  );
});
