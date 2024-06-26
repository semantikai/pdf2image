import { Line } from "konva/lib/shapes/Line.js";
import { BoundingRegion } from "@/types";
import { shapesLayerRef, stageRef } from "@/signals";
import convertCoordinatesToFlatArray from "./convertCoordinatesToFlatArray";
import { boundingRegionsEventsRef } from "@/signals/inference";
import { ShapeConfig } from "konva/lib/Shape";

const generatePolygon = ({ id, polygon, style }: BoundingRegion) =>
  new Line({
    id,
    points: convertCoordinatesToFlatArray(polygon),
    stroke: style?.stroke || "green",
    strokeWidth: style?.strokeWidth || 2,
    closed: true,
  });

const POLYGON_MOUSE_OVER_STYLE = {
  strokeWidth: 4,
};

const POLYGON_MOUSE_LEAVE_STYLE = {
  strokeWidth: 2,
};

export const DEFAULT_BOUNDING_REGIONS_EVENTS = {
  onMouseEnter: (): ShapeConfig => ({
    ...POLYGON_MOUSE_OVER_STYLE,
    fill: "rgba(0, 0, 0, 0.1)",
  }),
  onMouseLeave: (): ShapeConfig => ({
    ...POLYGON_MOUSE_LEAVE_STYLE,
    fill: "rgba(0, 0, 0, 0)",
  }),
};

export default function drawPolygons(
  inferenceShapes: BoundingRegion[],
  currentPageNumber: number
) {
  const shapesLayer = shapesLayerRef.value;
  if (!shapesLayer) return;
  shapesLayer.destroyChildren();
  inferenceShapes.forEach((shape) => {
    if (shape.pageNumber !== currentPageNumber) return;

    const polygonShape = generatePolygon(shape);
    polygonShape.on("click", (event) => {
      event.cancelBubble = true;
      console.log(`Clicked on polygon with id: ${shape.id}`);
      console.log(`Polygon points: ${shape.polygon}`);
      boundingRegionsEventsRef.value = ["click", shape];
    });
    polygonShape.on("mouseover", (event) => {
      event.cancelBubble = true;
      stageRef.value!.container().style.cursor = "pointer";
      boundingRegionsEventsRef.value = ["mouseenter", shape];
    });
    polygonShape.on("mouseout", (event) => {
      event.cancelBubble = true;
      stageRef.value!.container().style.cursor = "default";
      boundingRegionsEventsRef.value = ["mouseleave", shape];
    });
    shapesLayer.add(polygonShape);
  });
  shapesLayer.batchDraw();
}

export const redrawShape = (shapeId: string, shapeConfig: ShapeConfig) => {
  const shape = shapesLayerRef.value.findOne(`#${shapeId}`);
  if (shape) {
    shape.setAttrs(shapeConfig);
    shape.draw();
  } else {
    throw Error(`Shape ${shapeId} not found`);
  }
};
