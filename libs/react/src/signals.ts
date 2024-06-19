import { signal, computed } from "@preact/signals-react";
import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Image as KonvaImage } from "konva/lib/shapes/Image.js";

import computeImageBoundingBox from "./utils/computeBoundingBox";
import { InferenceDoc } from "./types";

export const stageRef = signal<Stage | undefined>(undefined);
export const shapesLayerRef = signal<Layer>(new Layer());
export const containerRef = signal<HTMLDivElement | null>(null);

export const imageLayerRef = signal(
  new Layer({
    listening: false,
  })
);

export const imageShapeRef = signal<KonvaImage | undefined>(undefined);
export const imageObjRef = signal<HTMLImageElement>(new Image());
export const imageBoundingBoxRef = computed(() => {
  if (!containerRef.value) return;
  return computeImageBoundingBox(containerRef.value, imageObjRef.value);
});

export const inferenceDocRef = signal<InferenceDoc | undefined>(undefined);
