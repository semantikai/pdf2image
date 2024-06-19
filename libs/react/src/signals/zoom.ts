import { applyCustomZoom } from "@/utils/applyCustomZoom";
import { effect, signal } from "@preact/signals-react";

export const zoomLevelRef = signal(0);
const MAX_STEP = 1;
export const onZoomIn = () => {
  zoomLevelRef.value += MAX_STEP;
};

export const onZoomOut = () => {
  zoomLevelRef.value -= MAX_STEP;
};

effect(() => {
  applyCustomZoom(zoomLevelRef.value);
});
