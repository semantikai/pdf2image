import { Line } from "konva/lib/shapes/Line.js";
import { BoundingRegion } from "@/types";
import { shapesLayerRef } from "@/signals";
import convertCoordinatesToFlatArray from "./convertCoordinatesToFlatArray";

const generatePolygon = ({ polygon, style }: BoundingRegion) =>
  new Line({
    points: convertCoordinatesToFlatArray(polygon),
    stroke: style?.stroke || "green",
    strokeWidth: style?.strokeWidth || 2,
    closed: true,
  });

export default function drawPolygons(
  inferenceShapes: BoundingRegion[],
  pageIndex: number
) {
  const shapesLayer = shapesLayerRef.value;
  if (!shapesLayer) return;
  shapesLayer.destroyChildren();
  inferenceShapes.forEach((shape) => {
    if (shape.pageNumber !== pageIndex) return;
    const polygonShape = generatePolygon(shape);
    polygonShape.on("click", () => {
      console.log(`Clicked on polygon with id: ${shape.id}`);
      console.log(`Polygon points: ${shape.polygon}`);
    });
    shapesLayer.add(polygonShape);
  });
  shapesLayer.batchDraw();
}
