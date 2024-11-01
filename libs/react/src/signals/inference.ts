import {
  InferenceField,
  InferenceResult,
  BoundingRegion,
  BoundingRegionsEventKeys,
  InferenceDoc,
} from "@/types";
import { effect, signal } from "@preact/signals-react";
import drawPolygons from "@/utils/drawPolygons";
import { inferenceImageRef } from "./image";
import { currentPageIndexRef } from "./documentPages";
import { Stage } from "konva/lib/Stage";
import { Layer } from "konva/lib/Layer";

export const stageRef = signal<Stage | undefined>(undefined);
export const shapesLayerRef = signal<Layer>(new Layer());
export const containerRef = signal<HTMLDivElement | null>(null);



export const inferenceResultRef = signal<InferenceResult | undefined>(
  undefined
);

export const inferenceFieldsRef = signal(new Map<string, InferenceField>([]));

export const boundingRegionsRef = signal<BoundingRegion[]>([]);

export const boundingRegionsEventsRef = signal<
  [BoundingRegionsEventKeys, BoundingRegion] | undefined
>(undefined);
effect(() => {
  if (inferenceResultRef.value) {
    inferenceFieldsRef.value = new Map(
      inferenceResultRef.value.fields.map((e) => [e.id, e])
    );
    boundingRegionsRef.value = inferenceResultRef.value.boundingRegions;
  } else {
    inferenceFieldsRef.value = new Map<string, InferenceField>([]);
    boundingRegionsRef.value = [];
  }
});

effect(() => {
  if (boundingRegionsRef.value.length && inferenceImageRef.value) {
    drawPolygons(boundingRegionsRef.value, currentPageIndexRef.value + 1);
  } else {
    if (shapesLayerRef.value.children.length) {
      shapesLayerRef.value.destroyChildren();
    }
  }
});
