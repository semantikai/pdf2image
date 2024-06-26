import {
  containerRef,
  stageRef,
  imageLayerRef,
  shapesLayerRef,
  inferenceDocRef,
} from "@/signals";
import { Stage } from "konva/lib/Stage";
import { applyStageZoom } from "./applyStageZoom";
import resizeStage from "./resizeStage";
import { clearInferenceProcessingDoc } from "@/signals/documentPages";

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
  containerRef.value = null;
  inferenceDocRef.value = undefined;
  stageRef.value?.destroy();
  window.removeEventListener("resize", resizeStage);
  clearInferenceProcessingDoc();
}
