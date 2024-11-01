import { Stage } from "konva/lib/Stage";
import computeImageBoundingBox from "./computeBoundingBox";
import { lerp, roundTo } from "./shared";
import { stageRef } from "@/signals/inference";
import { imageBoundingBoxRef } from "@/signals/image";

export const calculateCustomZoom = (
  stage: Stage,
  zoomScale: number,
  imageBoundingBox: ReturnType<typeof computeImageBoundingBox>
) => {
  const oldScale = stage.scaleX();
  const stagePosition = stage.position();
  const pointerPosition = {
    x: 0.5 * imageBoundingBox.width + imageBoundingBox.x,
    y: 0.5 * imageBoundingBox.height + imageBoundingBox.y,
  };

  const mousePointTo = {
    x: (pointerPosition.x - stagePosition.x) / oldScale,
    y: (pointerPosition.y - stagePosition.y) / oldScale,
  };

  const newScale = zoomScale * imageBoundingBox.scale;
  const smoothScale = lerp(oldScale, newScale, 0.5);
  const newPos = {
    x: roundTo(pointerPosition.x - mousePointTo.x * smoothScale, 2),
    y: roundTo(pointerPosition.y - mousePointTo.y * smoothScale, 2),
  };

  return { newScale: smoothScale, newPos };
};

export function applyCustomZoom(zoomScale: number) {
  const stage = stageRef.value;
  const imageBoundingBox = imageBoundingBoxRef.value;
  if (!stage || !imageBoundingBox) return;

  const { newScale, newPos } = calculateCustomZoom(
    stage,
    zoomScale,
    imageBoundingBox
  );

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
