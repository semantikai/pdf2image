import { KonvaEventObject } from "konva/lib/Node";
import { lerp, roundTo } from "./shared";
import { imageBoundingBoxRef, stageRef } from "@/signals";

const MAX_ZOOM = 10;
const ZOOM_STEP = 1.05;

const calculateStageZoom = (event: WheelEvent) => {
  const stage = stageRef.value;
  if (!stage) return { newScale: 1, newPos: { x: 0, y: 0 } };
  const oldScale = stage.scaleX();

  const stagePosition = stage.position();
  const pointerPosition = stage.getPointerPosition() || { x: 0, y: 0 };

  const mousePointTo = {
    x: (pointerPosition.x - stagePosition.x) / oldScale,
    y: (pointerPosition.y - stagePosition.y) / oldScale,
  };

  const newScale =
    event.deltaY < 0 ? oldScale * ZOOM_STEP : oldScale / ZOOM_STEP;
  const smoothScale = lerp(oldScale, newScale, 0.5);
  const newPos = {
    x: roundTo(pointerPosition.x - mousePointTo.x * smoothScale, 2),
    y: roundTo(pointerPosition.y - mousePointTo.y * smoothScale, 2),
  };

  return { newScale: smoothScale, newPos };
};
export function applyStageZoom(event: KonvaEventObject<WheelEvent>) {
  event.evt.preventDefault();
  const imageBoundingBox = imageBoundingBoxRef.value;
  if (!imageBoundingBox) return;
  const stage = stageRef.value;
  if (!stage) return;
  const { newScale, newPos } = calculateStageZoom(event.evt);

  if (newScale > MAX_ZOOM) return;

  if (newScale < imageBoundingBox.scale) {
    stage.draggable(false);
    stage.scale({ x: imageBoundingBox.scale, y: imageBoundingBox.scale });
    stage.position({ x: imageBoundingBox.x, y: imageBoundingBox.y });
    stage.setAttr("zoomScale", 1);
  } else {
    stage.draggable(true);
    stage.scale({ x: newScale, y: newScale });
    stage.setAttr("zoomScale", newScale / imageBoundingBox.scale);
    stage.position(newPos);
  }
  stage.batchDraw();
}
