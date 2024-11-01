import { imageObjRef } from "@/signals/image";
import { FlatCoordinateArray, PolygonCoordinates } from "@/types";

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

const toAbsolute = (point: number, axe: number = 1) => point * axe;

export default function convertCoordinatesToFlatArray(
  points: PolygonCoordinates
): FlatCoordinateArray {
  if (is2DArray(points)) {
    return points
      .map((point) => [
        toAbsolute(point.x, imageObjRef.value?.width),
        toAbsolute(point.y, imageObjRef.value?.height),
      ])
      .flat();
  }
  if (points.length % 2 !== 0) {
    throw new Error(
      "Unexpected number of points in the response, unable to translate as 2D points"
    );
  }
  if (isFlatArray(points)) {
    return points;
  }

  return points.reduce<FlatCoordinateArray>(
    (accumulator, value) =>
      accumulator.concat([
        toAbsolute(value[0], imageObjRef.value?.width),
        toAbsolute(value[1], imageObjRef.value?.height),
      ]),
    []
  );
}
