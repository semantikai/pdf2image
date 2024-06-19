import {
  containerRef,
  stageRef,
  imageLayerRef,
  shapesLayerRef,
} from "@/signals";
import { Stage } from "konva/lib/Stage";
import { applyStageZoom } from "./applyStageZoom";
import resizeStage from "./resizeStage";

export default function initStage() {
  if (containerRef.value) {
    stageRef.value = new Stage({
      container: containerRef.value,
    });
    stageRef.value.add(imageLayerRef.value, shapesLayerRef.value);
    stageRef.value.on("wheel", applyStageZoom);
    window.addEventListener("resize", resizeStage);
  }
}
