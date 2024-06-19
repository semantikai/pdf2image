import { PolygonCoordinates } from "@/types";

export function isFlatArray(arr: PolygonCoordinates): arr is Array<number> {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      return false;
    }
  }
  return true;
}

export const is2DArray = (
  arr: PolygonCoordinates
): arr is Array<{ x: number; y: number }> =>
  arr.every(
    (point) => typeof point === "object" && "x" in point && "y" in point
  );

export default function convertCoordinatesToFlatArray(
  points: Array<number[]> | Array<{ x: number; y: number }> | Array<number>
): Array<number> {
  if (is2DArray(points)) {
    return points.map((point) => [point.x, point.y]).flat();
  }
  if (points.length % 2 !== 0) {
    throw new Error(
      "Unexpected number of points in the response, unable to translate as 2D points"
    );
  }
  if (isFlatArray(points)) {
    return points;
  }

  return points.reduce((accumulator, value) => accumulator.concat(value), []);
}
