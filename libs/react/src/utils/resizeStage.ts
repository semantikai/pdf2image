import computeImageBoundingBox from "./computeBoundingBox.js";
import {
  containerRef,
  imageLayerRef,
  imageObjRef,
  stageRef,
} from "@/signals.js";

export default function resizeStage() {
  const stage = stageRef.value;
  const container = containerRef.value;
  const imageObj = imageObjRef.value;
  const imageLayer = imageLayerRef.value;
  if (!container || !imageObj || !imageLayer) return;
  if (!stage) return;
  stage.width(container.clientWidth);
  stage.height(container.clientHeight);
  const { scale, x, y } = computeImageBoundingBox(container, imageObj);

  stage.scale({
    x: scale,
    y: scale,
  });
  stage.position({ x, y });
}
