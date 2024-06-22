import { InferenceField, InferenceResult, BoundingRegion } from "@/types";
import { effect, signal } from "@preact/signals-react";
import drawPolygons from "@/utils/drawPolygons";
import { inferenceImageRef } from "./image";
import { currentPageIndexRef } from "./documentPages";

export const inferenceResultRef = signal<InferenceResult | undefined>(
  undefined
);

export const inferenceFieldsRef = signal(new Map<string, InferenceField>([]));

export const boundingRegionsRef = signal<BoundingRegion[]>([]);

effect(() => {
  if (inferenceResultRef.value) {
    inferenceFieldsRef.value = new Map(
      inferenceResultRef.value.fields.map((e) => [e.id, e])
    );
    boundingRegionsRef.value = inferenceResultRef.value.boundingRegions;
  }
});

effect(() => {
  if (boundingRegionsRef.value.length && inferenceImageRef.value) {
    drawPolygons(boundingRegionsRef.value, currentPageIndexRef.value + 1);
  }
});
