import { Stage } from "konva/lib/Stage";
import { applyStageZoom } from "./applyStageZoom";
import resizeStage from "./resizeStage";
import { imageLayerRef } from "@/signals/image";
import { containerRef, stageRef, shapesLayerRef } from "@/signals/inference";
import { inferenceDocRef } from "@/signals";

export function initCanvas() {
  if (containerRef.value) {
    stageRef.value = new Stage({
      container: containerRef.value,
    });
    stageRef.value.add(imageLayerRef.value, shapesLayerRef.value);
    stageRef.value.on("wheel", applyStageZoom);
    window.addEventListener("resize", resizeStage);
  }
}

export function destroyCanvas() {
  inferenceDocRef.value = undefined;
  stageRef.value?.destroy();
  window.removeEventListener("resize", resizeStage);
}
